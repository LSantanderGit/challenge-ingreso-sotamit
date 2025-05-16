const pool = require('./db');

async function crearTablas() {
	try {
		await pool.query(`
			CREATE TABLE IF NOT EXISTS area (
				id SERIAL PRIMARY KEY,
				version INTEGER DEFAULT 0,
				nombre VARCHAR(100) NOT NULL
			);
		`);

		await pool.query(`
			CREATE TABLE IF NOT EXISTS empleado (
				id SERIAL PRIMARY KEY,
				version INTEGER DEFAULT 0,
				nombre_completo VARCHAR(150) NOT NULL,
				documento_identidad VARCHAR(50),
				fecha_nacimiento DATE,
				es_desarrollador BOOLEAN DEFAULT false,
				descripcion TEXT,
				area_id INTEGER REFERENCES area(id)
			);
		`);

		await pool.query(`SELECT setval('empleado_id_seq', COALESCE((SELECT MAX(id) FROM empleado), 1), true)`);
		await pool.query(`SELECT setval('area_id_seq', COALESCE((SELECT MAX(id) FROM area), 1), true)`);

	} catch (err) {
		console.error("Error al crear las tablas:", err);
	}
}

module.exports = crearTablas;
