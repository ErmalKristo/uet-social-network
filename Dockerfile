FROM node:10-alpine

WORKDIR . /app

RUN npm i -g @adonisjs/cli

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD [ "adonis", "serve", "--dev" ]

