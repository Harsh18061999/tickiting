FROM node:alpine

WORKDIR /app
COPY package.json ./
COPY *.tgz ./
RUN npm install --only=prod --legacy-peer-deps
COPY . .

CMD ["npm", "start"]
