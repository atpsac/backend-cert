const { response } = require('express');
const bcryptjs = require('bcryptjs');
const db = require('../database/db');
const { generateJwt } = require('../helpers/generate-Jwt');

const login = async (req, res = response) => {

    const { username: userName, password } = req.body;

    try {
        // Verify if username is exist
        const sql = `SELECT * FROM User WHERE UserName = '${userName}';`;
        const result = await db.query(sql);

        if (Object.keys(result).length == 0) {
            return res.status(400).json({
                msg: 'User/Password no es válido - Username'
            });
        }
        const [dataResult] = result;
        const { UserId: userId, Password: passwordHash, Situation: situation } = dataResult;
        // Active user only
        if (situation != 1) {
            return res.status(400).json({
                msg: 'User/Password no es válido - Situation'
            });
        }
        // Password id valid

        const validPassword = bcryptjs.compareSync(password, passwordHash);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/Password no es válido - Password'
            });
        }

        // Generate JWT

        const token = await generateJwt(userId);


        res.json({
            msg: 'Login ok!',
            userName,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en Login'
        })
    }


};

module.exports = {
    login
}