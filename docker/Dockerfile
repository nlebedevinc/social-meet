FROM node:8
MAINTAINER Nikolay Lebedev <mikolebinc@gmail.com>
EXPOSE 5071

COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
COPY package.json package-lock.json /home/node/app/
WORKDIR /home/node/app/
RUN npm install

COPY . /home/node/app/
RUN npm run build

ENTRYPOINT [ "docker-entrypoint.sh" ]
