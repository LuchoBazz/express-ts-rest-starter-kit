FROM node:lts-hydrogen AS base

RUN npm i -g npm

FROM base AS dependencies-and-build

WORKDIR /express-ts-pg
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

CMD ["npm", "run", "start:prod"]