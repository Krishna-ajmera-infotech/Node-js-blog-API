FROM node:20.11.0

EXPOSE 3000

WORKDIR /app
COPY . .

ENV NODE_ENV=production

RUN npm install --omit=dev
RUN npm run start

CMD ["npm", "run", "docker-start"]
