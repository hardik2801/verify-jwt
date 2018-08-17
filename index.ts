import {sign, verify} from 'jsonwebtoken';
import * as requestPromise from 'request-promise';

export class YapsodyAuth {

    private jwtSecret: string = process.env.JWT_SECRET || '';
    private authServerUri = 'http://' + process.env.AUTH_SERVER + ':' + process.env.AUTH_SERVER_PORT;

    constructor() {

    }

    public async verifyUser(req) {
        try {
            if (req.headers.authorization.token) {
                // decode the data, cache it and return the same
                verify(req.headers.authorization.token, this.jwtSecret, (err, decodedToken: any) => {
                    // console.log("decoded", decodedToken, err);
                    if(!decodedToken) {
                        throw 'Invalid Token';
                    }
                    return decodedToken;
                });
            } else if (req.body.userName && req.body.password) {
                // call http auth server
                requestPromise({uri: this.authServerUri + '/login', method: 'GET'}).then((response) => {
                    return response;
                }).catch((error) => {
                    //handle error
                    throw error;
                });
            } else {
                // return 'Unauthorized'
                throw 'Unauthorized';
            }
        }
        catch (error) {
            // return error
            throw error;
        }
    }

    public async verifyClient(req) {
        try {
            if (req.headers.client_key) {
                // decode the data, cache it and return the same
                verify(req.headers.client_key, this.jwtSecret, (err, decodedToken: any) => {
                    // console.log("decoded", decodedToken, err);
                    if (!decodedToken) {
                        throw 'Invalid Token';
                    }
                    return decodedToken;
                });
            } else {
                // return 'Unauthorized'
                throw 'Unauthorized';
            }
        }
        catch (error) {
            // return error
            throw error;
        }
    }
}