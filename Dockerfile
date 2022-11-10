# syntax=docker/dockerfile:1

FROM node:16 as builder

ARG database_url
ARG database_name

ENV DATABASE_URL=${database_url}
ENV DATABASE_NAME=${database_name}

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install

RUN adduser -D myuser
USER myuser

CMD npm start
