# syntax=docker/dockerfile:1

FROM node:18 as builder

ARG database_url
ARG database_name
ARG mnemonic
ARG alchemy_api_key

ENV DATABASE_URL=${database_url}
ENV DATABASE_NAME=${database_name}
ENV MNEMONIC=${mnemonic}
ENV ALCHEMY_API_KEY=${alchemy_api_key}

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install

RUN adduser -D myuser
USER myuser

CMD npm start
