FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# 本番用ビルド
RUN npm run build

# 実行用イメージ
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# 本番環境用の設定
ENV NODE_ENV=production

EXPOSE 3000

# 本番用起動コマンド
CMD ["npm", "run", "start:prod"]
