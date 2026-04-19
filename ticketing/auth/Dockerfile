FROM node:alpine

WORKDIR /app
COPY package.json .
COPY *.tgz .
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]
