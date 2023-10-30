FROM node:18-alpine

WORKDIR /app/nukerduit-app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

COPY .env.example .env
COPY package.json ./
COPY package-lock.json ./
ADD . .

RUN npm install

CMD ["npm", "run", "dev", "--host=0.0.0.0"]