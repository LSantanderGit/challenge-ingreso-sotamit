# challenge-ingreso-sotamit

	Este proyecto es una aplicación CRUD para la gestión de empleados, desarrollada con **Node.js** para el backend, **Angular** para el frontend y **PostgreSQL** como base de datos. Permite crear, editar, eliminar y visualizar empleados y áreas.

## 🚀 Tecnologías Utilizadas

	- **Node.js** (Backend)
	- **Express.js**
	- **Angular** (Frontend)
	- **PostgreSQL** (Base de datos relacional)

	---

## ✅ Requisitos Previos

Asegurate de tener instalados:

1. **[Node.js y npm](https://nodejs.org/en/download/)**  
	Verifica con:
	```bash
	node -v
	npm -v

2. **Angular CLI (global)**
	npm install -g @angular/cli

3. **PostgreSQL**
	Descargar desde: https://www.postgresql.org/download/

4. **Crear un usuario y base de datos en PostgreSQL**
	Por ejemplo:
		CREATE DATABASE challenge_db;
		CREATE USER challenge_user WITH PASSWORD '1234';
		GRANT ALL PRIVILEGES ON DATABASE challenge_db TO challenge_user;

## ⚙️ Configuración Inicial

1. Crear el archivo .env
	En la raíz del proyecto, crea un archivo .env (basado en .env.example) con tus datos:
	DB_USER=challenge_user
	DB_PASSWORD=1234
	DB_HOST=localhost
	DB_PORT=5432
	DB_NAME=challenge_db

	Comando para copiar .env.example en .env:
	cp ./backend/src/.env.example ./backend/src/.env

2. Instalar dependencias
	En la raíz del proyecto, ejecutá:
	npm install
	cd frontend
	npm install
	cd ..

## ▶️ Ejecutar la Aplicación

Desde la raíz del proyecto:
	npm start

Esto lanzará:
    - 🔁 El servidor Node.js en: http://localhost:3000

    - 🌐 El cliente Angular en: http://localhost:4200

## 💡 Autor

Lucas Matías Santander
LinkedIn | GitHub 
https://www.linkedin.com/in/lucas-mat%C3%ADas-santander-99a974274/ | https://github.com/LSantanderGit