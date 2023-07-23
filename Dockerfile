FROM node:18.16.0

COPY . .

RUN apt-get update

RUN apt-get install -y build-essential libpq-dev

RUN npm i

RUN npx prisma generate

#RUN npm run build

EXPOSE 5173