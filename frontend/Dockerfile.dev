# メインイメージを軽いnodeに
FROM node:lts-buster-slim

RUN apt-get update && apt-get install -y \
  openssl

WORKDIR /app

# package.json yarn.lockをコピーする
COPY package.json yarn.lock ./

# yarn.lockを変更させない
RUN yarn install --frozen-lockfile

# 先に、.nextを生成したい
CMD [ "yarn", "dev" ]