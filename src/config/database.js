import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();


const sequelize = new Sequelize(


        proccess.env.DB_NAME,
        proccess.env.DB_USER,
        proccess.env.DB_PASSWORD,

        {
            host: proccess.env.DB_HOST,
            port: proccess.env.DB_PORT,
            dialect: "mysql",
        }

);

        export default sequelize;