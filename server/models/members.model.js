import DataTypes from "sequelize";
import sequelize from "../seq.js";

const Member = sequelize.define('Member', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    awards: {
        type: DataTypes.STRING
    },

}, {});

await Member.sync({ alter: true })
export default Member