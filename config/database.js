import { Sequelize } from 'sequelize' 
import dotenv from 'dotenv';
dotenv.config();

const {
  DB_PORT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_ENGINE,
} = process.env
 
const db = new Sequelize({
  dialect: DB_ENGINE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  timezone: '+07:00',
  logging: false,
   dialect: 'mysql'
}) 

export { db }