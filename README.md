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
![image](https://user-images.githubusercontent.com/88410576/231916531-d2f84aa8-783a-48df-8e54-ffc317711cf9.png)


### step3 prismaの設定
appコンテナに入る
1. VSCodeのDockerに移動
2. cyber-range-cms_appを右クリック
3. Attach Visual Studio Codeを押す
![image](https://user-images.githubusercontent.com/88410576/231915405-d8b40c7e-ab3f-4d48-b5fe-1ac866510f1d.png)

appコンテナのターミナルで、以下を実行。
```
yarn prisma migrate dev
yarn prisma generate
```
![image](https://user-images.githubusercontent.com/88410576/231915908-e3955e90-bccf-4058-abfa-b228d17a15e2.png)

コンテナを再起動する。
![image](https://user-images.githubusercontent.com/88410576/231916045-e0c999e6-8013-4e31-8443-806877306813.png)
![image](https://user-images.githubusercontent.com/88410576/231916125-282476fb-5e2e-442d-807e-ae691be40749.png)

または、
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
yarn prisma migrate dev
```

