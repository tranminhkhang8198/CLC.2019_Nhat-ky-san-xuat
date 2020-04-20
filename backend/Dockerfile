FROM node:lts-slim

RUN mkdir -p /usr/src/htx/app

WORKDIR /usr/src/htx/app

COPY package.json .

RUN npm install

RUN npm install -g nodemon

COPY . .