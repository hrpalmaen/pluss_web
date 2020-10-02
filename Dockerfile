FROM node:12.2.0-alpine
WORKDIR /pluss_web
COPY package.json  /pluss_web/package.json
RUN npm install
RUN ls
COPY . /pluss_web
RUN npm run build
RUN ls

# CMD ["npm","start"]

