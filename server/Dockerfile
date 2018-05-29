FROM node:10.2.1

RUN mkdir -p /visual_text/server
WORKDIR /visual_text/server

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Bundle app source.
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]