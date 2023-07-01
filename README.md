<h1 align="center">Rest Server | Express</h1>

<p align="center">
  <img width="60%" style="max-height:80vh; border-radius:2rem;" src="data:image/png;base64,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" />
</p>

<h4 align="center">Template for your Rest Api with express</h4>
<div align="center">
    <a align="center" href="https://documenter.getpostman.com/view/18645383/2s93z6ejTn">Postman Docs</a>
</div>

## Table of Contents:

- About The Project
- Installation
- Author
- Acknowledgments

## About The Project.

### Description

This project is a **template** for your **Rest Api** with **express**, it has a **login**, **register** and **renew** token, it also has a **CRUD** for **users**, **categories**, **products** and upload files.
Also this template has a Dockerfile for the creation of a container with the application.

### Purpose of this project.

The purpose of this project is divided into two main reasons.

- The first reason is aimed at learning this great Express framework and Mongoose management.
- The second reason is to have a template for future projects that require a Rest Api with express.

### My contribution

This project is the result of my learning in the course of [Node: De cero a experto By Fernando herrera](https://www.udemy.com/course/node-de-cero-a-experto/ "Node: De cero a experto By Fernando herrera") mainly done **javascript** and function oriented, i went further and decided to do it with **typescript** and with object oriented programming **(OOP)**.

### Built with.

For this project I use [Express](https://expressjs.com/ "Express") and [Mongoose](https://mongoosejs.com/ "Mongoose") for the backend, for the auth I use [JWT](https://jwt.io/ "JWT") and Google Sign-in, for the documentation I use [Postman](https://www.postman.com/ "Postman") and languages like [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript "Javascript") and [Typescript](https://www.typescriptlang.org/ "Typescript").

## Installation Dev

### Preequisites.

- [Nodejs](https://nodejs.org/es/ "Nodejs")
- [Nodemon](https://www.npmjs.com/package/nodemon "Nodemon")
- [Typescript](https://www.typescriptlang.org/ "Typescript")

### Installation.

1. Clone the repo
   ```sh
   git clone https://github.com/codigoenlaweb/rest-server-express
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. .env Variables
   - create .env file
   - complete the variables
4. Open terminal
   ```sh
   tsc --watch
   ```
5. Open other terminal
   ```sh
   nodemon dist/app.js
   ```

## Installation Docker

### Preequisites.

- [Docker](https://www.docker.com/ "Docker")

### Installation.

1. Clone the repo
   ```sh
   git clone
   ```
2. Build the image
   ```sh
   docker build -t rest-server-express .
   ```
3. .env Variables
   - create .env file
   - complete the variables
4. Run the container
   ```sh
   docker run -d -p 3000:3000 rest-server-express
   ```

## Author.

Jesus Olmos - [Linkedin](https://www.linkedin.com/in/jesus-armando-olmos-codeenlaweb/ "Linkedin") - olmosjesusarmando@gmail.com

## Acknowledgments.

Thanks to [Fernando herrera](https://github.com/Klerith "Fernando herrera") course for helping me advance and progress as a Front-end web developer, with such good mentoring and advice and quality content.
[course link](https://www.udemy.com/course/node-de-cero-a-experto/ "course link")
