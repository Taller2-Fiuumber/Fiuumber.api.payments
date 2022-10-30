# syntax=docker/dockerfile:1

FROM node:18-alpine3.15 as builder

ARG database_url
ENV DATABASE_URL=$database_url

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run prisma:generate
RUN npm run build

# Expose is NOT supported by Heroku
# $PORT is set by Heroku

CMD ["npm", "start"]
