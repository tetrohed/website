FROM node:12.16.1

ARG port=3000

RUN mkdir /app
WORKDIR /app

ADD . /app/
RUN yarn install --pure-lockfile

EXPOSE $port
RUN yarn run build:production

ENV HOST="0.0.0.0"
ENV PORT=$port

CMD ["yarn", "start:production"]