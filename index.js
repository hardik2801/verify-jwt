const jwt = require('jsonwebtoken');
const requestPromise = require('request-promise');
var redis = require('redis');

const jwtSecret = process.env.JWT_SECRET || '';
const authServerUri = 'http://' + process.env.AUTH_SERVER + ':' + process.env.AUTH_SERVER_PORT;
const redisClient = redis.createClient();

redisClient.on('connect', function() {
    console.log('connected redis');
});

function verifyUser(req) {
    return new Promise((resolve, reject) => {
        try {
            if (req.headers.authtoken) {
                // decode the data, cache it and return the same
                redisClient.get(req.headers.authtoken, (err, data) => {
                    console.log('checking redis');
                    if(err) {
                        reject(err);
                    }
                    if (data) {
                        console.log('retrieved from redis');
                       resolve(JSON.parse(data));
                    }
                });
                jwt.verify(req.headers.authtoken, jwtSecret, (err, decodedToken) => {
                    // console.log("decoded", decodedToken, err);
                    if (!decodedToken) {
                        reject({message:'Invalid Token', code: 403});
                    }
                    redisClient.set(req.headers.authtoken, JSON.stringify(decodedToken));
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
                reject({message:'Unauthorized', code:403});
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