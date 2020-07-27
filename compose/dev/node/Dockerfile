FROM node:13-alpine3.11

LABEL maintainer="luispenagos91@gmail.com"

ENV NODEDIR=/app

RUN mkdir $NODEDIR \
    && yarn global add nodemon

WORKDIR $NODEDIR

COPY ./src/package.json $NODEDIR

COPY ./src/yarn.lock $NODEDIR

RUN yarn install 

CMD nodemon bin/index.js
