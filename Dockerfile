FROM node:16-alpine AS base
ENV IS_CONTAINER true
WORKDIR /app
EXPOSE 8080
COPY package*.json ./
RUN npm ci --only=production

FROM node:16-alpine as build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY src ./src
COPY [".babelrc", ".sequelizerc", "docker-entrypoint.sh",  "./"]
RUN npm run build \
    && mkdir /app \
    && cp package.json package-lock.json /app \ 
    && cp .sequelizerc docker-entrypoint.sh /app \
    && cp -r lib /app/src

FROM base AS final
COPY --from=build /app .

ENTRYPOINT ["./docker-entrypoint.sh"]