const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

const jwtValidate = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid: id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uid
        const sql = `CALL sp_getUser(?);`;

        const [user] = await db.query(sql, [id]);
        const [userObj] = user;
        const { Situation: situation } = userObj;

        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if (situation === 0) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con situación: false'
            })
        }

        req.user = userObj;
        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}


module.exports = {
    jwtValidate
}