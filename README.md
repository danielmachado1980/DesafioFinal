# DesafioFinal

Projeto Final para a Certificação RocketSeat

# meetapp

Final Project for RocketSeat Certification

## clonando o projeto

Execute git clone https://github.com/danielmachado1980/DesafioFinal.git

## configurando o ambiente

1. Execute yarn install para os três projetos: backend, frontend e mobile
2. Crie uma base de dados chamada meetapp (MySql)
3. Renomeie o arquivo .env.example para .env no projeto backend e define as propriedades adequadamente
4. Baixe a última versão do Redis em https://github.com/microsoftarchive/redis/releases
5. Execute as migrations no projeto backend:
   ```sh
       npx sequelize-cli db:migrate
   ```

# backend

execute

```sh
yarn dev
```

# frontend

execute

```sh
npm start
```

# mobile (testado somente no Android)

execute

```sh
react-native run-android
```

## links importantes

Xampp para Windows [Web e Database](https://www.apachefriends.org/pt_br/download.html).

Redis.io [Database in-memory](https://redis.io/download).

Reatotron for [Debug](https://github.com/infinitered/reactotron).
