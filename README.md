## カリキュラム管理システム
テーマ「クラウドベースのセキュリティ演習」のカリキュラム管理アプリケーションのリポジトリ

- カリキュラム、コースの管理画面の作成
- コース情報を演習システムに提供するAPIの作成

## 開発環境準備
### step1　リポジトリをクローン
```
git clone https://github.com/shin-lab-sec/cyber-range-cms
```
cyber-range-cmsをVSCodeで開く
```
code cyber-range-cms
```


### step2 envファイルの作成
frontend ディレクトリ直下に.envを作成し、以下のコードを追加
```
DATABASE_URL="mysql://root:password@db:3306/prisma"
```

### step3　Docker起動
1. Docker Desktopを起動

2. コンテナを起動
```
docker compose up
```


### step4 ローカルで作業するための準備
```
cd frontend
yarn
```

### step5 prismaの設定
```
docker compose exec app yarn prisma migrate dev
```

### step6 起動したローカルサーバーへアクセス
http://localhost:3000/

ここまでやって上手く行かない場合はコンテナを再起動する。

```
docker compose stop
docker compose up
```


## パッケージを追加・削除する時
```
docker compose exec app yarn add ~
docker compose exec app yarn remove ~
```

## スキーマを変える手順

1. prisma/schema.prismaでスキーマを変更
2. マイグレーション

```
docker compose exec app yarn prisma migrate dev
```

3. 型定義更新
```
docker compose exec yarn prisma generate
```

4. コンテナ再起動
5. vscode再起動

## Dockerfileを変更する時
```
docker compose up --build
```
