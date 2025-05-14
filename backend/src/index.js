const express = require('express');
const pool = require('./database/db');

const crearTablas = require('./database/db-init');
crearTablas();

const app = express();
const port = 3000;

app.get('/usuarios', async (req, res) => {
try {
	const result = await pool.query('SELECT * FROM usuarios');
	res.json(result.rows);
} catch (err) {
	console.error('Error al obtener usuarios:', err);
	res.status(500).send('Error al consultar la base de datos');
}
});

app.listen(port, () => {
	console.log(`Servidor corriendo en http://localhost:${port}`);
});
