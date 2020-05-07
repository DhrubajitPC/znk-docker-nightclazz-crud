FROM node:13.14.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD npm start