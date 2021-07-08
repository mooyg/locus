FROM node:16-alpine3.11
ENV NODE_ENV=production

COPY . /app
WORKDIR /app
RUN npm i -g lerna
RUN lerna bootstrap
CMD lerna run dev --parallel
EXPOSE 3000
EXPOSE 4000
