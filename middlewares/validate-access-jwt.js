const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateAccessByJwt = (req = request, res = response, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No token sent'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Send uid to request
        //req.uid = uid;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
};

module.exports = {
    validateAccessByJwt
};