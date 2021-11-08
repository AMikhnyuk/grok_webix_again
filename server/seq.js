import Model from "sequelize"
import Sequelize from "sequelize";
import DataTypes from "sequelize";


const sequelize = new Sequelize(
    'mydb',
    'root',
    '123',
    {
        dialect: 'mysql',
    }
)

sequelize
    .authenticate()
    .then(() => console.log('Connected.'))
    .catch((err) => console.error('Connection error: ', err))