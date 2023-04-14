# メインイメージを軽いnodeに
FROM node:lts-buster-slim

RUN apt-get update && apt-get install -y \
  openssl

# cd
WORKDIR /app

# yarnでnode_modulesを作成する
COPY package.json ./

RUN yarn install

# 先に、.nextを生成したい
CMD [ "yarn", "dev" ]
