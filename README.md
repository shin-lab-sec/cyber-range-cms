## カリキュラム管理システム

テーマ「クラウドベースのセキュリティ演習」のカリキュラム管理アプリケーションのリポジトリ

- カリキュラム、コースの管理画面の作成
- コース情報を演習システムに提供する API の作成

## 開発環境準備

### step1 　リポジトリをクローン

```
git clone https://github.com/shin-lab-sec/cyber-range-cms
```

cyber-range-cms を VSCode で開く

```
code cyber-range-cms
```

### step2 　 Docker 起動

1. Docker Desktop を起動

2. コンテナを起動

```
docker compose up
```

### (step3 ローカルで作業するための準備)　※コンテナ内で開発するなら、飛ばして OK

```
cd frontend
yarn
```

### step4 prisma の設定

```
docker compose exec app yarn prisma migrate dev
```

### step5 起動したローカルサーバーへアクセス

- cms: http://localhost:8002/
- コンソール: http://localhost:9090

ここまでやって上手く行かない場合はコンテナを再起動する。

```
docker compose stop
docker compose up
```

### step6  (httpsで接続)

画像をアップロード、表示するには `cypas-local-tls-proxy` コンテナを立ち上げる必要がある
（リポジトリ　https://github.com/shin-lab-sec/cypas-local-tls-proxy）
他にはhosts, ブラウザの設定が複数あるため、としきに聞く

---

## パッケージを追加・削除する時

```
docker compose exec app yarn add ~
docker compose exec app yarn remove ~
```

## スキーマを変える手順

1. prisma/schema.prisma でスキーマを変更
2. マイグレーション

```
docker compose exec app yarn prisma migrate dev
```

3. 型定義更新

```
docker compose exec yarn prisma generate
```

4. コンテナ再起動
5. vscode 再起動

## Dockerfile を変更した後

```
docker compose up --build
```
