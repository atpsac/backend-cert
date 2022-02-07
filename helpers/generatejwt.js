const jwt = require('jsonwebtoken');

const generateJwt = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        // JWT Sign
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token not generated');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generateJwt
};