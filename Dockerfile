FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma migrate dev
