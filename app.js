import express from 'express';
import sequelize from './src/config/database.js';

const app = express();
app.use(express.json());

try {
	await sequelize.authenticate();
	console.log("Base de datos conectada correctamente");
} catch (error) {
	console.error(" Error de conexión con la base de datos:", error);
}

app.listen(3000, () => {
	console.log("Servidor corriendo en http://localhost:3000");
});
