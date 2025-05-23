const express = require('express');
const pool = require('./database/db');

const crearTablas = require('./database/db-init');
crearTablas();

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/empleados/list', async (req, res) => {
	try {
		const resultado = await pool.query(`
			SELECT
				EMPLEADO.ID AS "id",
				EMPLEADO.NOMBRE_COMPLETO,
				EMPLEADO.DOCUMENTO_IDENTIDAD,
				EMPLEADO.FECHA_NACIMIENTO,
				EMPLEADO.ES_DESARROLLADOR,
				EMPLEADO.DESCRIPCION,
				AREA.NOMBRE AS "areaNombre"
			FROM
				EMPLEADO
				JOIN AREA ON EMPLEADO.AREA_ID = AREA.ID
			ORDER BY
				EMPLEADO.ID;
		`);

		const empleados = resultado.rows.map(e => {
			const fecha = new Date(e.fecha_nacimiento);
			const fechaFormateada = fecha.toLocaleDateString('es-AR');
			
			return {
				id: e.id,
				nombreCompleto: e.nombre_completo,
				documento: e.documento_identidad,
				fechaNacimiento: fechaFormateada,
				esDesarrollador: e.es_desarrollador,
				descripcion: e.descripcion,
				areaNombre: e.areaNombre
			};
		});

		res.json(empleados);
	} catch (error) {
		console.error('Error al obtener empleados:', error);
		res.status(500).json({ error: 'Error interno al obtener empleados' });
	}
});

app.get('/empleados/getAreas', async (req, res) => {
	try {
		const resultado = await pool.query(
			`SELECT
				ID,
				NOMBRE
			FROM
				AREA
			ORDER BY
				NOMBRE;`
		);
		res.json(resultado.rows);
	} catch (error) {
		console.error('Error al obtener áreas:', error);
		res.status(500).json({ error: 'Error al obtener áreas' });
	}
});

app.post('/empleados/save', async (req, res) => {
	const { nombreCompleto, documento, fechaNacimiento, esDesarrollador, descripcion, areaId } = req.body;

	try {
		const resultado = await pool.query(`
			INSERT INTO empleado (
				nombre_completo,
				documento_identidad,
				fecha_nacimiento,
				es_desarrollador,
				descripcion,
				area_id
			) VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *;
		`, [nombreCompleto, documento, fechaNacimiento, esDesarrollador, descripcion, areaId]);

		res.status(201).json(resultado.rows[0]);
	} catch (error) {
		console.error('Error al crear empleado:', error);
		res.status(500).json({ error: 'Error al crear empleado' });
	}
});

app.get('/empleados/edit/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const result = await pool.query(`
			SELECT
				ID,
				NOMBRE_COMPLETO AS "nombreCompleto",
				DOCUMENTO_IDENTIDAD AS "documento",
				TO_CHAR(FECHA_NACIMIENTO, 'YYYY-MM-DD') AS "fechaNacimiento",
				ES_DESARROLLADOR AS "esDesarrollador",
				DESCRIPCION,
				AREA_ID AS "areaId"
			FROM
				EMPLEADO
			WHERE
				ID = $1
		`, [id]);

		if (result.rows.length === 0) return res.status(404).json({ error: 'Empleado no encontrado' });

		res.json(result.rows[0]);
	} catch (error) {
		console.error('Error al obtener empleado:', error);
		res.status(500).json({ error: 'Error interno al obtener empleado' });
	}
});

app.put('/empleados/update/:id', async (req, res) => {
	const id = req.params.id;
	const { nombreCompleto, documento, fechaNacimiento, esDesarrollador, descripcion, areaId } = req.body;

	try {
		const result = await pool.query(`
			UPDATE empleado
			SET nombre_completo = $1,
				documento_identidad = $2,
				fecha_nacimiento = $3,
				es_desarrollador = $4,
				descripcion = $5,
				area_id = $6
			WHERE id = $7
			RETURNING *;
		`, [nombreCompleto, documento, fechaNacimiento, esDesarrollador, descripcion, areaId, id]);

		if (result.rowCount === 0) return res.status(404).json({ error: 'Empleado no encontrado' });

		res.json(result.rows[0]);
	} catch (error) {
		console.error('Error al actualizar empleado:', error);
		res.status(500).json({ error: 'Error interno al actualizar empleado' });
	}
});

app.delete('/empleados/delete/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const result = await pool.query(`DELETE FROM empleado WHERE id = $1`, [id]);
		if (result.rowCount === 0) {
			return res.status(404).json({ error: 'Empleado no encontrado' });
		}
	
		res.status(204).send();
	} catch (error) {
		console.error('Error al eliminar empleado:', error);
		res.status(500).json({ error: 'Error interno al eliminar empleado' });
	}
});

app.post('/area/save', async (req, res) => {
	const { nombre } = req.body;

	if (!nombre || nombre.trim() === '') {
		return res.status(400).json({ error: 'El nombre es obligatorio' });
	}

	try {
		const result = await pool.query(
			`INSERT INTO area (nombre) VALUES ($1) RETURNING *;`,
			[nombre.trim()]
		);

		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error('Error al crear área:', error);
		res.status(500).json({ error: 'Error al crear área' });
	}
});


app.listen(port, () => {
	console.log(`Servidor corriendo en http://localhost:${port}`);
});
