# メインイメージを軽いnodeに
FROM node:lts-buster-slim

RUN apt-get update && apt-get install -y \
  openssl

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# pnpm-lock.yamlを変更させない
RUN pnpm install --frozen-lockfile

# 先に、.nextを生成したい
CMD [ "pnpm", "dev" ]
