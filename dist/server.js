"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const config = require("./config");
const models_1 = require("./models");
const routes_1 = require("./routes");
const ErrorHandler_1 = require("./utils/errors/ErrorHandler");
const InternalServerError_1 = require("./utils/errors/InternalServerError");
class Server {
    // TODO Make all of this async
    constructor() { }
    static initializeApp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                require('dotenv').config();
                Server.app = express();
                // Configure application
                Server.configureApp();
                // Initialize Routes
                routes_1.Router.initializeRoutes(Server.app);
                Server.app.use(ErrorHandler_1.errorHandler);
                process.on('unhandledRejection', (reason, p) => {
                    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
                });
                try {
                    yield Server.initializeDatabase();
                }
                catch (error) {
                    console.log('Failed to initialize database', error);
                }
                return Server.app.listen(Server.app.get('port'));
            }
            catch (error) {
                throw new InternalServerError_1.InternalServerError(error.message);
            }
        });
    }
    static initializeDatabase() {
        const nodeEnv = process.env.NODE_ENV;
        if (nodeEnv) {
            const sequelizeConfig = config[nodeEnv];
            const models = new models_1.Models(sequelizeConfig);
            return models.initModels();
        }
        else {
            throw new InternalServerError_1.InternalServerError('No NODE ENV set');
        }
    }
    static configureApp() {
        Server.app.set('port', process.env.PORT || 3000);
        Server.app.use(bodyParser.urlencoded({ extended: true }));
        Server.app.use(bodyParser.json());
        Server.app.use(compression());
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map