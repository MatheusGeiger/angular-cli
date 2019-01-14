FROM node:11.5.0-alpine

EXPOSE 4200

ADD . /angular-cli

RUN cd /angular-cli && \
    npm install && \
    if [ -f ~/.npmrc ]; then rm ~/.npmrc; fi

VOLUME /angular-cli/node_modules

WORKDIR /angular-cli

CMD ["npm", "start"]