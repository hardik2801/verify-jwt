const jwt = require('jsonwebtoken');
const requestPromise = require('request-promise');

const jwtSecret = process.env.JWT_SECRET || '';
const authServerUri = 'http://' + process.env.AUTH_SERVER + ':' + process.env.AUTH_SERVER_PORT;

function verifyUser(req) {
    return new Promise((resolve, reject) => {
        try {
            if (req.headers.authorization.token) {
                // decode the data, cache it and return the same
                jwt.verify(req.headers.authorization.token, jwtSecret, (err, decodedToken) => {
                    // console.log("decoded", decodedToken, err);
                    if (!decodedToken) {
                        reject('Invalid Token');
                    }
                    resolve(decodedToken);
                });
            } else if (req.body.userName && req.body.password) {
                // call http auth server
                requestPromise({uri: authServerUri + '/login', method: 'GET'}).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    //handle error
                    reject(error);
                });
            } else {
                // return 'Unauthorized'
                reject('Unauthorized');
            }
        }
        catch (error) {
            // return error
            reject(error);
        }
    });
}

function verifyClient(req) {
    return new Promise((resolve, reject) => {
        try {
            if (req.headers.client_key) {
                // decode the data, cache it and return the same
                jwt.verify(req.headers.client_key, jwtSecret, (err, decodedToken) => {
                    // console.log("decoded", decodedToken, err);
                    if (!decodedToken) {
                        reject('Invalid Token');
                    }
                    resolve(decodedToken);
                });
            } else {
                // return 'Unauthorized'
                reject('Unauthorized');
            }
        }
        catch (error) {
            // return error
            reject(error);
        }
    });
}

module.exports = {
    verifyUser: verifyUser,
    verifyClient: verifyClient
};