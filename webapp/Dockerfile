FROM node:16.13.2

LABEL version="1.0"
LABEL description="Purfect Creations webapp base docker image"
LABEL maintainer = ["radusocaci@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]