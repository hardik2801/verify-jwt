const jwt = require('jsonwebtoken');
const requestPromise = require('request-promise');

const jwtSecret = process.env.JWT_SECRET || '';
const authServerUri = 'http://' + process.env.AUTH_SERVER + ':' + process.env.AUTH_SERVER_PORT;

function verifyUser(req) {
    return new Promise((resolve, reject) => {
        try {
            if (req.headers.authtoken) {
                // decode the data, cache it and return the same
                jwt.verify(req.headers.authtoken, jwtSecret, (err, decodedToken) => {
                    // console.log("decoded", decodedToken, err);
                    if (!decodedToken) {
                        reject({message:'Invalid Token', code: 403});
                    }
                    resolve(decodedToken);
                });
            } else if (req.body.userName && req.body.password) {
                // call http auth server
                requestPromise({uri: authServerUri + '/login', method: 'GET'}).then((response) => {
                    resolve(response);
                }).catch((error) => {
                    //handle error
                    reject({message: error, code: 401});
                });
            } else {
                // return 'Unauthorized'
                // reject({message:'Unauthorized', code:403});
            }
        }
        catch (error) {
            // return error
            console.log(error, 'catch err');
            reject({message: error, code:401});
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