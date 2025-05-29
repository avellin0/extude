FROM node:latest

WORKDIR /home/app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install 

COPY . . 

EXPOSE 3000

CMD ["npm", "run", "start"]