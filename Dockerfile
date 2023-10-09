# Multi-stage build
# This Dockerfile is splited into multiple stages in order to make use of Bitbucket caching feature.
# This image run as root user so we need to put "--unsafe-perm" when install npm packages.
FROM node:12.22-alpine3.12@sha256:83233f79a40109329a5c29e4aa42013ddb65c649388f42ff1f889b68849d8de6 AS node_modules
WORKDIR /src
RUN apk add git
COPY package*.json ./
COPY c2c c2c
RUN npm set unsafe-perm true \
  && npm install --verbose

FROM node_modules AS apispec
COPY apidoc apidoc
COPY CHANGELOG.md ./
RUN npm run apidoc && npm run changelog

##
# Target
##
FROM node:12.22-alpine3.12 AS target

WORKDIR /app

COPY package*.json ./

RUN npm set unsafe-perm true
COPY --from=apispec /src/c2c c2c
RUN apk add --no-cache git && npm install --production --ignore-scripts && apk del git
RUN npm rebuild --verbose sharp

COPY scripts scripts
COPY views views
COPY migrations migrations
COPY src src

COPY --from=apispec /src/changelog changelog
COPY --from=apispec /src/apidoc/output apidoc

ENV PORT=5000
EXPOSE 5000
CMD ["./scripts/entrypoint.sh"]
