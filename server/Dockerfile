FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i --quiet
COPY . .
CMD ["node", "index.js"]