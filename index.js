const jwt = require('jsonwebtoken');
const requestPromise = require('request-promise');
var redis = require('redis');

const jwtSecret = process.env.JWT_SECRET || 'yapsodySecret';
// const authServerUri = 'http://' + process.env.AUTH_SERVER + ':' + process.env.AUTH_SERVER_PORT;
const authServerUri = 'http://127.0.0.1:3001/users/'
const redisClient = redis.createClient();

redisClient.on('connect', function() {
    // console.log('connected redis');
});

// signup new user
function registerUser(req) {
    return new Promise((resolve, reject) => {
        try {
            if(!(req.body.email && req.body.password && req.body.firstName && req.body.lastName)) {
                return reject({message: 'insufficient data!', code: 401})
            }
            const options = {
                uri: authServerUri + 'registeruser', method: 'POST',
                method: 'POST',
                body: {
                    email: req.body.email,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                },
                json: true
            }
            requestPromise(options).then((response) => {
                return resolve(response);
            }).catch((error) => {
                //handle error
                return reject({message: error, code: 401});
            });

        } catch (error) {
            return reject(error);
        }
    });
}

// authorize user
function verifyUser(req) {
    return new Promise((resolve, reject) => {
        try {
            if (req.headers.authtoken) {
                // decode the data, cache it and return the same
                redisClient.get(req.headers.authtoken, (err, data) => {
                    if(err) {
                        return reject(err);
                    }
                    if (data) {
                       return resolve(JSON.parse(data));
                    }
                });
                jwt.verify(req.headers.authtoken, jwtSecret, (err, decodedToken) => {
                    if(err) {
                        return reject({message:'Invalid Token', code: 403, errName: err.name});
                    }
                    if (!decodedToken || (Object.keys(decodedToken).length <= 0)) {
                        return reject({message:'Invalid Token', code: 403});
                    }
                    return resolve(decodedToken);
                });
            } else if (req.body.email && req.body.password) {
                // call http auth server
                const options = {
                    uri: authServerUri + 'login', method: 'POST',
                    method: 'POST',
                    body: {
                        email: req.body.email,
                        password: req.body.password
                    },
                    json: true
                }
                requestPromise(options).then((response) => {
                    return resolve(response);
                }).catch((error) => {
                    //handle error
                    return reject({message: error, code: 401});
                });
            } else {
                // return 'Unauthorized'
                return reject({message:'Unauthorized', code:403});
            }
        }
        catch (error) {
            // return error
            return reject(error);
        }
    });
}

// TODO : authorize client
function verifyClient(req) {
    return new Promise((resolve, reject) => {
        try {
            if (req.headers.client_key) {
                // decode the data, cache it and return the same
                jwt.verify(req.headers.client_key, jwtSecret, (err, decodedToken) => {
                    // console.log("decoded", decodedToken, err);
                    if (!decodedToken) {
                        return reject('Invalid Token');
                    }
                    resolve(decodedToken);
                });
            } else {
                // return 'Unauthorized'
                return reject('Unauthorized');
            }
        }
        catch (error) {
            // return error
            return reject(error);
        }
    });
}

module.exports = {
    verifyUser: verifyUser,
    verifyClient: verifyClient,
    registerUser: registerUser
};