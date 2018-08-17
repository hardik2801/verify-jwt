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
const jsonwebtoken_1 = require("jsonwebtoken");
const requestPromise = require("request-promise");
class YapsodyAuth {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || '';
        this.authServerUri = 'http://' + process.env.AUTH_SERVER + ':' + process.env.AUTH_SERVER_PORT;
    }
    verifyUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.headers.authorization.token) {
                    // decode the data, cache it and return the same
                    jsonwebtoken_1.verify(req.headers.authorization.token, this.jwtSecret, (err, decodedToken) => {
                        // console.log("decoded", decodedToken, err);
                        if (!decodedToken) {
                            throw 'Invalid Token';
                        }
                        return decodedToken;
                    });
                }
                else if (req.body.userName && req.body.password) {
                    // call http auth server
                    requestPromise({ uri: this.authServerUri + '/login', method: 'GET' }).then((response) => {
                        return response;
                    }).catch((error) => {
                        //handle error
                        throw error;
                    });
                }
                else {
                    // return 'Unauthorized'
                    throw 'Unauthorized';
                }
            }
            catch (error) {
                // return error
                throw error;
            }
        });
    }
    verifyClient(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.headers.client_key) {
                    // decode the data, cache it and return the same
                    jsonwebtoken_1.verify(req.headers.client_key, this.jwtSecret, (err, decodedToken) => {
                        // console.log("decoded", decodedToken, err);
                        if (!decodedToken) {
                            throw 'Invalid Token';
                        }
                        return decodedToken;
                    });
                }
                else {
                    // return 'Unauthorized'
                    throw 'Unauthorized';
                }
            }
            catch (error) {
                // return error
                throw error;
            }
        });
    }
}
exports.YapsodyAuth = YapsodyAuth;
//# sourceMappingURL=index.js.map