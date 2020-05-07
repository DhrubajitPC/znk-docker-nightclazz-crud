FROM node:14.2.0-alpine3.11 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.17.10

RUN apt-get update && apt-get install dos2unix

EXPOSE 3000

COPY --from=builder /app/build /usr/share/nginx/html

COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /

RUN dos2unix docker-entrypoint.sh
RUN  chmod 0777 docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]