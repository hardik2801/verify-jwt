"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const AccessToken_1 = require("./entities/AccessToken");
const Client_1 = require("./entities/Client");
const User_1 = require("./entities/User");
var sequelize_typescript_2 = require("sequelize-typescript");
exports.Sequelize = sequelize_typescript_2.Sequelize;
var AccessToken_2 = require("./entities/AccessToken");
exports.AccessToken = AccessToken_2.AccessToken;
var Client_2 = require("./entities/Client");
exports.Client = Client_2.Client;
var User_2 = require("./entities/User");
exports.User = User_2.User;
/**
 *  All models must be imported from this file or else they will not be registered with Sequelize
 */
class Models {
    constructor(config) {
        this.sequelize = new sequelize_typescript_1.Sequelize(config);
    }
    initModels() {
        this.sequelize.addModels(this.getModels());
        return this.sequelize.sync({ force: process.env.NODE_ENV === 'test' });
    }
    // TODO Scan models folder to build list
    getModels() {
        return [
            AccessToken_1.AccessToken, Client_1.Client, User_1.User
        ];
    }
}
exports.Models = Models;
//# sourceMappingURL=index.js.map