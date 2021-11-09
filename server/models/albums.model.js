import DataTypes from "sequelize";
import sequelize from "../seq.js";

const Album = sequelize.define('Album', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.STRING
    },
    songsnum: {
        type: DataTypes.STRING
    },
    copiesnum: {
        type: DataTypes.STRING
    },
    groupId: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING(1234)
    }
}, {});
await Album.sync({ alter: true })
export default Album