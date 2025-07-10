import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import languageRoutes from './src/routes/language.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log('✅ Conexión a la base de datos establecida');

		await sequelize.sync(); // sin alter ni force
		console.log('🗃️ Tablas sincronizadas');

		app.use('/api/languages', languageRoutes);

		app.listen(3000, () => {
			console.log('🚀 Servidor corriendo en http://localhost:3000');
		});
	} catch (error) {
		console.error('❌ Error al iniciar el servidor:', error);
	}
};

startServer();
