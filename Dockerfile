# # # FROM node:alpine
# # FROM node:18
# # WORKDIR "/app"
# # COPY ./package.json ./
# # RUN npm install
# # # RUN npx sequelize-cli db:migrate
# # # RUN npx sequelize-cli db:seed:all
# # COPY . .
# # CMD ["npm","run","dev"]

FROM node:18

WORKDIR /hoidanit/backend

COPY package*.json ./

RUN  npm install

RUN  npm install -g @babel/core @babel/cli

COPY  . .

CMD ["npm","run","dev"]

# # docker build --tag node-docker
# # docker run -p 8080:8080 -d node-docker


