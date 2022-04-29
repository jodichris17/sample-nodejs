FROM node:8-alpine

LABEL MAINTAINER "jodi"
LABEL DESCRIPTION "Sample Project for NodeJS"

ARG APP_USER="nodejs"
ARG APP_GROUP="nodejs"
ARG WORK_DIRECTORY="/usr/src/app"

WORKDIR $WORK_DIRECTORY
COPY . .

# Create APP_USER and APP_GROUP
# Change WORK_DIRECTORY ownership to APP_USER:APP_GROUP
RUN apk add --no-cache --virtual build-dependencies g++ python make libcap \
    && apk add --no-cache dumb-init \
    && setcap 'cap_net_bind_service=+ep' /usr/local/bin/node \
    && addgroup -S ${APP_GROUP} \
    && adduser -S ${APP_USER} -G ${APP_GROUP} \
    && npm ci --only=production \
    && apk del build-dependencies \
    && chown -R ${APP_USER}:${APP_GROUP} ${WORK_DIRECTORY}

# Configure container user to APP_USER instead of 'root'
USER ${APP_USER}

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "index.js"]