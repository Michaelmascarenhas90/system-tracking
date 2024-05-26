FROM 22-alpine

WORKDIR /api

COPY package.json package-lock.json

RUN npm install

COPY src/ .

EXPOSE 3000

CMD [ "npm", "start" ]
