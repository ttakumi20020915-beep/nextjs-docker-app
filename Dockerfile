# Node 20 必須 (Next.js 15 以降)
FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /app

# 依存関係だけコピーして先に npm install
COPY package*.json ./
RUN npm install

# 残りのソースコードをコピー
COPY . .

# コンテナ内で使うポート
EXPOSE 3000

# 開発サーバを起動
CMD ["npm", "run", "dev"]
