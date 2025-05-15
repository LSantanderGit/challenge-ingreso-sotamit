const express = require('express');
const pool = require('./database/db');

const crearTablas = require('./database/db-init');
crearTablas();

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/empleados', async (req, res) => {
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

app.listen(port, () => {
	console.log(`Servidor corriendo en http://localhost:${port}`);
});
