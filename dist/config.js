"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv').config();
const Sequelize = require("sequelize");
exports.development = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // Defaults for Mysql
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql",
    "logging": false
};
exports.test = {
    dialect: "sqlite",
    storage: 'tests/sqlite.db',
    logging: false
};
exports.production = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: false
};
exports.sequelize = new Sequelize(this.development.database, this.development.username, this.development.password, {
    dialect: this.development.dialect,
    port: 3306,
    host: process.env.DB_HOST
});
exports.sequelize.authenticate().then(() => {
    console.log('db connected');
});
//# sourceMappingURL=config.js.map