## カリキュラム管理システム
テーマ「クラウドベースのセキュリティ演習」のカリキュラム管理アプリケーションのリポジトリ

- カリキュラム、コースの管理画面の作成
- コース情報を演習システムに提供するAPIの作成

## 開発環境準備
### step1　リポジトリをクローン
```
git clone https://github.com/shin-lab-sec/cyber-range-cms
```

### step2　Docker起動
cyber-range-cmsの階層に移動
```
cd cyber-range-cms
```

Docker Desktopを起動

コンテナを起動
```
docker compose up
```


VSCodeの拡張機能で、Dockerを入れる

.envに追加

```
DATABASE_URL="mysql://root:password@db:3306/prisma"
```


### step3 prismaの設定
appコンテナに入る
1. VSCodeのDockerに移動
2. cyber-range-cms_appを右クリック
3. Attach Visual Studio Codeを押す

appコンテナのターミナルで、以下を実行。
```
yarn prisma migrate dev
yarn prisma generate

```

コンテナを再起動する。

```
docker compose stop
docker compse up
```


### step4 起動したローカルサーバーへアクセス
http://localhost:3000/


## スキーマを変える手順

1. prisma/schema.prismaでスキーマを変更
2. マイグレーション

```
docker copmose exec yarn prisma migrate dev
```

3. コンテナ再起動

