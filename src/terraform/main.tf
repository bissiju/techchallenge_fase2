provider "aws" {
  region = "us-east-1"
}

resource "aws_cognito_user_pool" "user_pool" {
  name = "user-pool"

  schema {
    attribute_data_type = "String"
    name                = "custom_attribute"
    required            = false
  }
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name = "user-pool-client"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}

resource "aws_lambda_function" "lambda_function" {
  function_name = "lambda-function"
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = aws_iam_role.lambda_execution_role.arn

  s3_bucket = aws_s3_bucket.bucket_fiap_techchallenge.bucket
  s3_key = "lambda/lambda_function.zip"

  environment {
    variables = {
      ENVIRONMENT = "production"
    }
  }
}

resource "aws_iam_role" "lambda_execution_role" {
  name               = "lambda-execution-role"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Action   = "sts:AssumeRole"
        Effect   = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role" "eks_role" {
  name               = "eks-role"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Service = "ec2.amazonaws.com" }
        Action    = "sts:AssumeRole"
      },
      {
        Effect    = "Allow"
        Principal = { Service = "eks.amazonaws.com" }
        Action    = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role" "eks_node_role" {
  name               = "eks-node-role"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = { Service = "ec2.amazonaws.com" }
        Action    = "sts:AssumeRole"
      },
      {
        Effect    = "Allow"
        Principal = { Service = "eks.amazonaws.com" }
        Action    = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy_attachment" "eks_node_policy_attachment" {
  name       = "eks-node-policy-attachment"
  roles      = [aws_iam_role.eks_node_role.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

/*resource "aws_eks_node_group" "node-group-fiap-techchallenge" {
  cluster_name    = aws_eks_cluster.cluster_fiap_techchallenge.name
  node_group_name = "node-group-fiap-techchallenge"
  node_role_arn   = aws_iam_role.eks_role.arn
  subnet_ids      = ["subnet-0817f7939dd6af29a", "subnet-0844f3208ed5552a4"]

  scaling_config {
    desired_size = 2
    max_size     = 5
    min_size     = 1
  }
}*/

resource "aws_eks_cluster" "cluster_fiap_techchallenge" {
  name     = "cluster-fiap-techchallenge"
  role_arn = aws_iam_role.eks_role.arn
  version  = "1.29"

  vpc_config {
    subnet_ids = ["subnet-0817f7939dd6af29a", "subnet-0844f3208ed5552a4"]
    security_group_ids = ["sg-034823223f020803a"]
  }
}

resource "aws_rds_cluster" "rds_cluster_fiap_techchallenge" {
  cluster_identifier = "rds-cluster-fiap-techchallenge"
  engine = "aurora-mysql"
  skip_final_snapshot = true

  master_username = "username"
  master_password = "pass1234"
}

resource "aws_s3_bucket" "bucket_fiap_techchallenge" {
  bucket = "bucket-fiap-techchallenge"
}