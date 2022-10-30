# 22C2-Fiuumber
Template Express JS backend


Para instalar todo, desde el directorio raiz del proyecto ejecutar:
```
npm i
```

Ejecutar el proyecto:
```
npm run dev
```

Ingresar a la ubicación http:
```
http://localhost:4000/
```

Ejecutar tests:
```
npm test
```

Para instalar Docker:
```
sudo apt  install docker.io
```

Para PostgreSQL:
https://www.postgresql.org/download/

## Corrida Docker dev basico

Build docker image:

``` bash
docker build . -t fiummber-api:0.0.1
```

Run server:

``` bash
docker run -dp 4000:4000 fiummber-api:0.0.1 --env-file .env.dev
```

Visualizar imagen:

``` bash
http://localhost:4000/
```
