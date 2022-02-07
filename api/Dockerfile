FROM node:16.13.2

LABEL version="1.0"
LABEL description="Purfect Creations API base docker image"
LABEL maintainer = ["radusocaci@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 8000

CMD ["node", "src/util/portConfig"]