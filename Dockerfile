FROM node:16-alpine AS base
WORKDIR /app
EXPOSE 8080

FROM node:16-alpine as build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY src ./src
COPY [".babelrc",".sequelizerc",  "./"]
RUN npm run build \
    && mkdir /app \
    && cp package.json package-lock.json .babelrc .sequelizerc .babelrc /app \
    && cp -r lib /app/lib

FROM base AS final
COPY --from=build /app .
RUN npm ci --only=production

CMD [ "npm", "start" ]