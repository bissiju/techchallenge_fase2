FROM node:16-alpine AS build

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./
RUN yarn install

COPY src ./src

RUN yarn run build

FROM node:16-alpine as prod

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/dist ./dist

RUN yarn install --production

CMD [ "node", "dist/index.js" ]