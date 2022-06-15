
# FROM node:14-alpine as builder

# RUN mkdir -p /app

# WORKDIR /app

# COPY package*.json ./
# RUN yarn install 
# # COPY ./ ./
# RUN yarn build


# FROM node:14-alpine
# WORKDIR /app
# COPY --from=builder /app ./

# ENV PORT=8000
# ENV DOCKER=true


# EXPOSE ${PORT}




FROM node:16-alpine

# RUN mkdir /usr/src/app

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "yarn", "dev" ]

