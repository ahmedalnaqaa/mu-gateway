# Use the official lightweight Node.js 10 image.
# https://hub.docker.com/_/node
FROM node:14-slim

RUN apt -y update && \
    apt -y upgrade && \
    apt -y install build-essential

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY client/package*.json ./client/
RUN cd client && npm install

COPY package*.json ./
RUN npm install

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "run", "dev" ]
