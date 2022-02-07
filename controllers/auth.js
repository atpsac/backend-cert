const { response } = require('express');
const db = require('../database/db');
const { generateJwt } = require('../helpers/generate-Jwt');

const login = async (req, res = response) => {

    const { userName, password } = req.body;

    try {
        // Verify if username is exist
        const sql = `SELECT * FROM User WHERE UserName = '${userName}';`;
        const result = await db.query(sql);

        if (Object.keys(result).length == 0) {
            return res.status(400).json({
                msg: 'User/Password is not valid - Username'
            });
        }
        const [dataResult] = result;
        const { UserId: userId, PasswordHash: passwordHash, Situation_SituationId: situationId } = dataResult;
        // Active user only
        if (situationId != 1) {
            return res.status(400).json({
                msg: 'User/Password is not valid - Situation'
            });
        }
        // Password id valid

        // const validPassword = bcryptjs.compareSync(password, passwordHash);

        if (password !== passwordHash) {
            return res.status(400).json({
                msg: 'User/Password is not valid - Password'
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
            msg: 'Login error'
        })
    }


};

module.exports = {
    login
}