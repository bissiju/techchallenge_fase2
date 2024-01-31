# Tech Challenge Fase 2 - 4SOAT - Pós Tech FIAP - Software Architecture

Grupo 42:
Juliana Bissi Pires - RM 351921

Repositório:
https://github.com/bissiju/techchallenge_fase2

Observação: A fim de praticar uma nova stack, não houve refatoração a partir da entrega da Fase 1, desenvolvida em PHP. Trata-se de um novo projeto.

## Requisitos

Desenvolvimento de um sistema de autoatendimento para gestão de pedidos em restaurante de fast food.

Atendendo às necessidades de autenticação de cliente a partir do CPF, nome e e-mail ou sem identificação. Possibilitando que o cliente escolha itens entre as categorias de lanches, acompanhamentos, bebidas e sobremesas, a partir da exibição dos mesmos com nome, descritivo, valor e imagem. O pedido é iniciado e solicita a realização do pagamento, via integração com Mercado Pago para método de pagamento com QRCode.

O pedido é processado, e disponibilizado para o início do preparo, somente após a confirmação de pagamento enviado para o Webhook do sistema. O status do pedido é atualizado pela equipe do restaurante, conforme as etapas "recebido", "em preparação", "pronto" e "finalizado", e pode ser acompanhado pelo cliente no totem do autoatendimento.

A equipe do restaurante gerencia através de acesso administrativo, além do andamento dos pedidos, categorias, produtos e clientes.

## Especificações

* Node.js v16
* TypeScript
* Express
* MySQL
* Sequelize
* Docker
* Kubernetes

## Arquitetura

Os princípios do Domain-Driven Design (DDD) e da Clean Architecture foram utilizados para o desenho da arquitetura e implementação em camadas, delimitando as responsabilidades entre aplicação, domínio e serviços externos.

- adapters: camada de interface com o controlador para injeção dos serviços e conversão das entidades em DTO;
- api: camada da aplicação;
- domain: camada de domínio e regras de negócio, com as entidades, casos de uso e repositórios;
- gateways: comunicação com serviços externos como banco de dados e integração de pagamento;

```shell
.
└── src/
    ├── adapters/
    │   ├── controllers/
    ├── api/
    │   ├── interface/
    │   └── routers/
    ├── domain/
    │   ├── entity/
    │   ├── repository/
    │   └── use_case/
    └── gateways/
        ├── database/
        └── payment_service/

```

## Instruções de Instalação

Pré-requisitos:
- Docker
- Kubernetes

### Docker

Para instalação local, executar o comando `docker compose up` na raíz do projeto.

Acessar o localhost na porta 3000: http://localhost:3000

### Kubernetes

Criar imagem do Docker, a partir do diretório raiz: `docker build . -t techchallenge-fase2`

E executar os comandos do Kubernets abaixo:

`cd k8s`

`kubectl apply -f .`

Acompanhar o status:

`kubectl get pods` e `kubectl logs --follow <pod-name>`

Quando finalizado acessar o localhost na porta 31000: http://localhost:31000

### Endpoints API

Arquivo Postman Collection: /TechChallenge-Fase2.postman_collection.json

Ajustar a porta de acordo com a instalação realizada (3000 ou 31000).

Idealmente, seguir a ordenação das endpoints conforme estão dispostas na collection para validação da API.

## Demo

Vídeo demonstrativo:
https://youtu.be/u0jHQteXp40
