# challenge-ingreso-sotamit

	Este proyecto es una aplicación CRUD para la gestión de empleados, desarrollada con **Node.js** para el backend, **Angular** para el frontend y **PostgreSQL** como base de datos. Permite crear, editar, eliminar y visualizar empleados y áreas.

## 🚀 Tecnologías Utilizadas

	- **Node.js** (Backend)
	- **Express.js**
	- **Angular** (Frontend)
	- **PostgreSQL** (Base de datos relacional)

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
	
## 📦 Dependencias
## 🔧 Backend – Node.js / Express

Estas dependencias están definidas en package.json en la raíz del proyecto:

1. express ^5.1.0 – Framework web para crear el servidor backend.

2. cors ^2.8.5 – Permite compartir recursos entre diferentes dominios (CORS).

3. dotenv ^16.5.0 – Para cargar variables de entorno desde un archivo .env.

4. pg ^8.16.0 – Cliente oficial de PostgreSQL para Node.js.

5. concurrently ^9.1.2 (devDependency) – Permite ejecutar múltiples scripts (ng serve + backend) en paralelo.

## 🌐 Frontend – Angular

Estas dependencias están en frontend/package.json. Usás Angular versión 18.2:

1. @angular/core, @angular/common, @angular/forms, @angular/router – Base del framework Angular.

2. @angular/ssr ^18.2.2 – Soporte para Server-Side Rendering (SSR).

3. bootstrap ^5.3.6 – Framework CSS para estilos responsive.

4. rxjs ~7.8.0 – Programación reactiva con observables.

5. zone.js ~0.14.10 – Necesario para el cambio de detección de Angular.

Desarrollo (devDependencies):

6. @angular/cli ^18.2.2 – Herramienta de línea de comandos para Angular.

7. @angular/compiler-cli ^18.2.0

8. @angular-devkit/build-angular ^18.2.2

9. typescript ~5.5.2

10. @types/node, @types/express, @types/jasmine

11. karma, karma-coverage, karma-jasmine, karma-chrome-launcher – Herramientas de testing.

12. jasmine-core ~5.2.0
    

## ▶️ Ejecutar la Aplicación

Desde la raíz del proyecto:
	npm start

Esto lanzará:
    - 🔁 El servidor Node.js en: http://localhost:3000

    - 🌐 El cliente Angular en: http://localhost:4200


## 📡 Endpoints de la API

La API proporciona las siguientes rutas para gestionar empleados y áreas.
🔹 Empleados

1. GET /empleados/list

Obtiene la lista completa de empleados, incluyendo información del área.

Respuesta exitosa (200 OK):

[
  {
    "id": 1,
    "nombreCompleto": "Juan Pérez",
    "documento": "12345678",
    "fechaNacimiento": "14/05/2000",
    "esDesarrollador": true,
    "descripcion": "Frontend",
    "areaNombre": "Informática"
  }
]

2. GET /empleados/getAreas

Devuelve una lista de todas las áreas disponibles.

Respuesta exitosa (200 OK):

[
  { "id": 1, "nombre": "Informática" },
  { "id": 2, "nombre": "Recursos Humanos" }
]

3. POST /empleados/save

Crea un nuevo empleado.

Body JSON requerido:

{
  "nombreCompleto": "Lucas Santander",
  "documento": "98765432",
  "fechaNacimiento": "1999-01-15",
  "esDesarrollador": true,
  "descripcion": "Fullstack Developer",
  "areaId": 1
}

Respuestas:

    - 201 Created – Empleado creado exitosamente.

    - 500 Internal Server Error – Error al guardar.
    
4. GET /empleados/edit/:id

Obtiene los datos de un empleado específico por su ID.

Respuesta exitosa (200 OK):

{
  "id": 5,
  "nombreCompleto": "Ana Torres",
  "documento": "45678901",
  "fechaNacimiento": "2000-06-10",
  "esDesarrollador": false,
  "descripcion": "Administrativa",
  "areaId": 2
}

Errores:

    - 404 Not Found – Si no se encuentra el empleado.
    
5. PUT /empleados/update/:id

Actualiza un empleado existente.

Body JSON requerido: Igual al de creación.

Respuestas:

    - 200 OK – Empleado actualizado.

    - 404 Not Found – Si el ID no existe.

6. DELETE /empleados/delete/:id

Elimina un empleado por su ID.

Respuestas:

    - 204 No Content – Eliminado correctamente.

    - 404 Not Found – Si el ID no existe.
    
🔹 Áreas
POST /area/save

Crea una nueva área.

Body JSON requerido:

{
  "nombre": "Logística"
}

Respuestas:

    - 201 Created – Área creada exitosamente.

    - 400 Bad Request – Si no se especifica el nombre.

    - 500 Internal Server Error – Si ocurre un error interno.
    
## 🗄️ Base de Datos
🔸 Elección de la Base de Datos

Se eligió PostgreSQL como sistema de gestión de base de datos por los siguientes motivos:

    - Es open source, robusto y ampliamente utilizado en producción.

    - Ofrece tipos de datos avanzados, integridad referencial y alto soporte para transacciones.

    - Facilita la escalabilidad y cuenta con gran compatibilidad con Node.js (pg).

    - Permite el uso de secuencias automáticas (SERIAL) para generación de IDs únicos. 

🔸 Diagrama Entidad-Relación (DER)
Ver "diagramaEntidadRelacion.png" en el repositorio

🔸 Consultas SQL
1. Crear tablas:

	CREATE TABLE area (
		id SERIAL PRIMARY KEY,
		version INTEGER DEFAULT 0,
		nombre VARCHAR(100) NOT NULL
	);

	CREATE TABLE empleado (
		id SERIAL PRIMARY KEY,
		version INTEGER DEFAULT 0,
		nombre_completo VARCHAR(150) NOT NULL,
		documento_identidad VARCHAR(50),
		fecha_nacimiento DATE,
		es_desarrollador BOOLEAN DEFAULT false,
		descripcion TEXT,
		area_id INTEGER REFERENCES area(id)
	);

Consultas CRUD

2. Insertar un nuevo empleado

INSERT INTO empleado (
	nombre_completo,
	documento_identidad,
	fecha_nacimiento,
	es_desarrollador,
	descripcion,
	area_id
) VALUES ('Juan Pérez', '12345678', '1999-01-01', true, 'Desarrollador Backend', 1);

3. Actualizar un empleado

UPDATE empleado
SET nombre_completo = 'Lucas S.',
	documento_identidad = '87654321',
	fecha_nacimiento = '1995-12-31',
	es_desarrollador = false,
	descripcion = 'RRHH',
	area_id = 2
WHERE id = 5;


4. Eliminar un empleado

DELETE FROM empleado WHERE id = 5;

5. Obtener todos los empleados con área

SELECT
	EMPLEADO.id,
	EMPLEADO.nombre_completo,
	EMPLEADO.documento_identidad,
	EMPLEADO.fecha_nacimiento,
	EMPLEADO.es_desarrollador,
	EMPLEADO.descripcion,
	AREA.nombre AS area_nombre
FROM empleado
JOIN area ON empleado.area_id = area.id
ORDER BY empleado.id;

6. Obtener un empleado por ID

SELECT * FROM empleado WHERE id = 5;

7. Insertar un área

8. INSERT INTO area (nombre) VALUES ('Sistemas');

## 💡 Autor

Lucas Matías Santander
LinkedIn | GitHub 
https://www.linkedin.com/in/lucas-mat%C3%ADas-santander-99a974274/ | https://github.com/LSantanderGit
