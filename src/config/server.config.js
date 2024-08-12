import dotenv from "dotenv";
dotenv.config()

const serverConfig = {
    port: process.env.SERVER_PORT,
    dbUrl :process.env.SERVER_DB_URL,
    secretKey : process.env.SERVER_JWT_SECRET_KEY
}


export default serverConfig


