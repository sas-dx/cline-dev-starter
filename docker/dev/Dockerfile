FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# 開発環境用の設定
ENV NODE_ENV=development

# ホットリロード対応
CMD ["npm", "run", "dev"]
