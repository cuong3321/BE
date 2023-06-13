const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    development: {
        username: "root",
        password: 123456,
        database: contactdemo,
        port: 3308,
        host: "localhost",
        dialect: "mysql",
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    production: {
        username: "root",
        password: 123456,
        database: contactdemo,
        port: 3308,
        host: "localhost",
        dialect: "mysql",
    },
};
