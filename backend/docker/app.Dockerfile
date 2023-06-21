FROM node:16 as build
COPY --chown=node:node dumb-init_1.2.5_x86_64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init
WORKDIR /home/node/proj
COPY --chown=node:node package*.json yarn.lock ./
RUN yarn install --pure-lockfile --frozen-lockfile
COPY --chown=node:node . .
RUN yarn build-linux

FROM node:16 as prod_modules
WORKDIR /home/node/proj
COPY --chown=node:node package*.json yarn.lock ./
RUN yarn install --prod --pure-lockfile --frozen-lockfile

FROM node:16
WORKDIR /home/node/proj
COPY --chown=node:node --from=build /usr/local/bin/dumb-init /usr/local/bin/dumb-init
COPY --chown=node:node --from=build /home/node/proj/dist ./dist
COPY --chown=node:node --from=prod_modules /home/node/proj/node_modules ./node_modules
COPY --chown=node:node catalogue.json ./
COPY --chown=node:node package.json ./
COPY --chown=node:node .env ./
USER node

# avoid calling yarn script, instead call directly to obtain right pid and provide graceful shutdown
CMD [ \
    "dumb-init", \
    "node", \
    "./node_modules/cross-env/src/bin/cross-env.js", \
    # vars coming from gh.secrets on deploy (or passed directly if launching locally)
    "DEV_TAG=${DEV_TAG}", \
    "CORS_URL=${CORS_URL}", \
    "API_VERSION=${API_VERSION}", \
    "COOKIE_SECRET=${COOKIE_SECRET}", \
    "CACHE_PASSWORD=${CACHE_PASSWORD}", \
    "node", \
    "-r", \
    # additional persistent vars coming from .env file
    "dotenv/config", \
    "./dist/app.js" \
    ]