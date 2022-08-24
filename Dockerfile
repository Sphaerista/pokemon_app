# syntax=docker/dockerfile:1
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /prep_for_uk
COPY . .
RUN npm install
CMD ["npm", "start"]