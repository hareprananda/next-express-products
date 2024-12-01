FROM node:18.17.0

WORKDIR /var/app/travlr-be

COPY ./be .

RUN yarn install

RUN yarn build

CMD [ "yarn", "start" ]