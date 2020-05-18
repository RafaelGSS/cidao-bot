################### FIRST STAGE - COMPILE and BUILD
FROM node:13.14.0-alpine AS build

ARG APP_VERSION

ENV APP_VERSION $APP_VERSION

ENV BUILD_DIR /build-dir

WORKDIR $BUILD_DIR

RUN apk add --no-cache python make g++

COPY package.json ./

RUN npm install

COPY . $BUILD_DIR
RUN npm run build

#################### SECOND STAGE - RUN
FROM node:13.14.0-alpine

ARG APP_ENV=production
ARG APP_VERSION

ENV NODE_ENV $APP_ENV
ENV APP_VERSION $APP_VERSION

RUN apk add --no-cache python make g++

ENV BUILD_DIR /build-dir
ENV APP_DIR ./app

COPY --from=build $BUILD_DIR/dist $APP_DIR
COPY package.json $APP_DIR

WORKDIR $APP_DIR

RUN npm install --production --silent

CMD ["npm", "run", "start:prod"]
