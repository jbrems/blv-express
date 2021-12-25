FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN mkdir ./src/tile/cache

EXPOSE 3000

CMD ["npm", "start"]