# fibo-dock-cci

Entire web app setup in docker containers for Development and Deployment on AWS Server.

It includes

  nginx: high speed server for routing
  client: a react app serving client/ static data 
  express-server: node js express server
  redis: used redis in-memory store
  postgres: used postgres for persistent data
  worker: it is responsible for calculating fibo for each requests or insertions in redis cache
  
Used docker-compose with config v3.4

Restart Policies fo containers
Order in which they are executed

Added Makefile for docker-compose commands


Also all docker containers except nginx use mounted volumnes for development purpose. So that
changes can be seen without rebuiling and restarting containers.

Happy, coding!
