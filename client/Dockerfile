FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm i --silent --quiet
COPY . .
RUN npm run build
CMD ["npm","run","start:prod"]