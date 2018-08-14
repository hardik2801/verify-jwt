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
const bcrypt = require("bcrypt");
const util_1 = require("util");
class YapsodyAuth {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'Yapsody_auth';
    }
    static comparePasswords(pass1, pass2) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pass1 && pass2) {
                return bcrypt.compare(pass1, pass2);
            }
            else {
                return false;
            }
        });
    }
    verifyAccessToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!accessToken)
                    // throw new ValidationError('No Token Found');
                    throw util_1.error('No Token Found');
                jsonwebtoken_1.verify(accessToken, this.jwtSecret, (err, decodedToken) => {
                    if (!decodedToken)
                        // throw new AuthError('Invalid Token');
                        throw util_1.error('Invalid Token');
                    return decodedToken;
                });
            }
            catch (error) {
                // throw err
            }
        });
    }
}
exports.YapsodyAuth = YapsodyAuth;
//# sourceMappingURL=app.js.map