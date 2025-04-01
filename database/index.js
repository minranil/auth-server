import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import UserModel from  "./UserModel.js";

dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST
});

export const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log('Database connected!')
});


export default sequelize;