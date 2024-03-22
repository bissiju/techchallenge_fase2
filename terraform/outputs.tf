output "lambda_function_arn" {
  value = aws_lambda_function.lambda_function.arn
}

output "rds_cluster_endpoint" {
  value = aws_rds_cluster.rds_cluster_fiap_techchallenge.endpoint
}

output "eks_cluster_endpoint" {
  value = aws_eks_cluster.cluster_fiap_techchallenge.endpoint
}