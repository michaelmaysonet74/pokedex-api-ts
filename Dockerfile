FROM node:25-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY src/ ./src/

EXPOSE 8080

CMD ["npx", "tsx", "src/index.ts"]
