# Fiuumber API Payments

Smart contract and basic service to solve payments in the Taller de Programacion 2' projects.

This repository uses the following tools:

- docker
- javascript
- mongodb
- datadog
- solidity

## Installation

For local developement we used docker. To set upp docker environment please first run the following commands.

This command will create the mongodb database container and the container where we will run our web app:

```bash
docker-compose up --force-recreate -d
```

This command will let us interact with the web app's with bash:

```bash
docker exec -it fiuumberapipayments_web_1 bash
root@96d618aee885:/app#
```

Then you have to rename the `.env.example` to `.env` and complete the environment variables declared inside with our data given by [MetaMask](https://metamask.io/).

Then, inside the container we can install the dependencies:

``` bash
root@96d618aee885:/app# npm i
```

Then, we have to deploy our block chain by running:

``` bash
root@96d618aee885:/app# npm run deploy-goerli
```

Then we can run our app with the following command:

``` bash
root@96d618aee885:/app# npm run start

> BasicPayments@1.0.0 start
> node src/server
```

Afterwards we can go to `http://localhost:8082/docs` and see the swagger documentation our backend service.


Another relevant commands are:

- Linter: `npm run lint`
- Formatter: `npm run prettier`
- Formatter: `npm run coverage`
