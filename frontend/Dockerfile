FROM node:12.13.0-alpine

# Create dir
RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app/src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000 

CMD ["npm", "start"]