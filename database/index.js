import { Sequelize } from "sequelize";
import config from "config";
import UserModel from  "./UserModel.js";


const dbConfig = config.get('DATABASE');

const sequelize = new Sequelize(dbConfig.NAME, dbConfig.USER, dbConfig.PASSWORD, {
    dialect: dbConfig.DIALECT,
    host: dbConfig.HOST,
    pool: dbConfig.POOL,
});

export const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
    console.log('Database connected!')
});


export default sequelize;