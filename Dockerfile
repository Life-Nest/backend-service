FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN echo 'DATABASE_URL="postgresql://postgres:root@172.17.0.3:5432/dev_db"' > .env