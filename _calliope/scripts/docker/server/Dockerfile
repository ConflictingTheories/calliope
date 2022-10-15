# /*                                            *\
# ** ------------------------------------------ **
# **         Calliope - Site Generator   	    **
# ** ------------------------------------------ **
# **  Copyright (c) 2020 - Kyle Derby MacInnis  **
# **                                            **
# ** Any unauthorized distribution or transfer  **
# **    of this work is strictly prohibited.    **
# **                                            **
# **           All Rights Reserved.             **
# ** ------------------------------------------ **
# \*                                            */

FROM --platform=linux/amd64 ubuntu
LABEL Author "Kyle Derby MacInnis"
# Env Variables
ENV API_VERSION=${API_VERSION}
ENV API_ROUTE_PATH=${API_ROUTE_PATH}
ENV WEBSITE_HOST=${WEBSITE_HOST}
RUN apt-get update -y && apt-get install -y curl nodejs git gnupg dos2unix
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -y && apt-get install -y yarn npm

ENV WEBSITE_PORT=${WEBSITE_PORT}
ENV ADMIN_HOST=${ADMIN_HOST}
ENV ADMIN_PORT=${ADMIN_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}
ENV DB_TYPE=${DB_TYPE}
ENV PUBLIC_URL=${PUBLIC_URL}
ENV ENABLE_AUTH=${ENABLE_AUTH}
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Edmonton
# Copy Content
WORKDIR /opt
RUN mkdir calliope
WORKDIR /opt/calliope
COPY ./.env .env
RUN /bin/bash -c "source .env"
RUN mkdir app
RUN mkdir site
WORKDIR /opt/calliope/app
COPY ./app .
# Yarn & NodeJS
WORKDIR /opt/calliope/app
# Build Source
RUN npx n 18.0.0
RUN npm install -g @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/config @types/node concurrently http-server typescript wait-on
# Expose Ports
EXPOSE 8081 8088 ${WEBSITE_PORT} ${ADMIN_PORT}
# Copy Site Contents
WORKDIR /opt/calliope/app
# Start when Container Opens
CMD [ "yarn", "start" ]

