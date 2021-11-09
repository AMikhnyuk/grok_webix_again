import DataTypes from "sequelize";
import sequelize from "../seq.js";

const Song = sequelize.define('Song', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    albumId: {
        type: DataTypes.INTEGER
    },

}, {});

await Song.sync({ alter: true })
export default Song