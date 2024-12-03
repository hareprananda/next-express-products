FROM node:18.17.0

WORKDIR /var/app/travlr-fe

COPY ./fe .

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]