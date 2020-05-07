FROM node:13.14.0
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
CMD npm start