import mysql from "mysql"
import dotenv from "dotenv"
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
connection.connect(error => {
    if (error) throw error;
    console.log("Database connect successfull");
});

export default connection