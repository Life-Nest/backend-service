FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN echo 'DATABASE_URL="mysql://root:root@database-service:3306/dev_db"' > .env
