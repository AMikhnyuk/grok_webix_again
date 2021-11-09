import DataTypes from "sequelize";
import sequelize from "../seq.js";

const Band = sequelize.define('Band', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    composition: {
        type: DataTypes.STRING
    },
    style: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    },

}, {});
await Band.sync({ alter: true })
export default Band