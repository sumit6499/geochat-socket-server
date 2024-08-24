FROM node:alpine as builder

WORKDIR /build

COPY package*.json .

RUN npm install

COPY tsconfig.json tsconfig.json

COPY src/ src/

RUN cd src

RUN npm run build

FROM node:alpine as runnner

WORKDIR /app

COPY --from=builder build/package*.json .
COPY --from=builder build/node_modules node_modules
COPY --from=builder build/dist dist

EXPOSE 8000

CMD [ "npm","start" ]