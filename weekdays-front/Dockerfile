FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build

EXPOSE 4200

CMD ng serve --host 0.0.0.0 --port 4200