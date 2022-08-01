import dotenv from 'dotenv'
dotenv.config()

const optionsMariaDB = {
    client: process.env.CLIENT_SQL,
    connection: {
        host: process.env.HOST_SQL,
        user: process.env.USER_SQL,
        password: process.env.PASSWORD_SQL,
        database: process.env.DATABASE_SQL
    }
}

export default optionsMariaDB