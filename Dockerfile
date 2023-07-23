FROM node:18.16.0

COPY . .

RUN npm i

#RUN npm run build

EXPOSE 5173