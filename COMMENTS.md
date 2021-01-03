Comments
===================

##  Release 1.1
Resolve uma implementação errada do método *delete* que permitia a exclusão do registro sem confirmação. 


# Importante
Antes de tudo, no terminal:

*cd alunos*

*npm run serve*

A api que consta no diretório *back* está apenas como referência para avaliação. É a mesma api que está rodando no postgres do heroku.

## Decisão de arquitetura utilizada

O padrão MVC foi escolhido para esse projeto pela famliaridade com o padrão. Atualmente eu dou manutenção em um sistema que usa Laravel e Vue, logo estou habituado ao MVC.

## Lista de bibliotecas de terceitos utilizadas
### No front-end
- Axios
- Vuetify
- Eslint
### No back-end
- CORS
- DOTENV
- Express
- Helmet
- KNEX
- PG
- SQLITE3 (para ambiente de desenvolvimento)

## O que melhoraria se tivesse mais tempo?
Implementaria um middleware de autenticação e uma página de acesso. No fim das contas, ficou apenas uma página executando todas as operações. Sem nenhum tipo de autenticação.

## Quais os requisitos obrigatórios não foram entregues?
Acabei fugindo um pouco da requisiçao original ao fazer mudanças no front. A meu ver não faz muito sentido resolver em duas telas, criar dois componentes, fazer rotas diferentes quando o próprio Vuetify oferece uma solução para as operações de cadastro / atualização / exclusão e consulta em uma tela só.