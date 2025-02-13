FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

RUN npm run build

RUN npm run initdb

EXPOSE 3010

CMD ["node", "dist/index.js"]