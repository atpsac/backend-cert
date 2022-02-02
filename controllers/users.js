const { response, request } = require('express');
const db = require('../database/db');
const bcryptjs = require('bcryptjs');

const usersGet = async (req = request, res = response) => {

    const sql = 'SELECT * FROM user LIMIT 2';
    try {
        const result = await db.query(sql);
        console.log(result);
        res.json({
            result
        });
        // console.log(fields);
    } catch (e) {
        console.log(e);
    }

    //const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    
}

const usersPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { userName, email, password, phoneNumber, updateUser } = req.body;

    const sql = `CALL Sp_UserUpdate(?, ?, ?, ?, ?, ?);`;
    const result = await db.query(sql, [id, userName, email, password, phoneNumber, updateUser]);

    return res.status(200).json({
        msg: 'Updated Row',
        result
    });

};

const usersPost = async (req = request, res = response) => {

    const { user, password, email } = req.body;
    const salt = bcryptjs.genSaltSync();
    const pass_encrypt = bcryptjs.hashSync(password, salt);

    const sql = `INSERT INTO USER(UserName,Email,PasswordHash,PhoneNumber,CreateDate,CreateUser,UpdateUser,Situation_SituationId) VALUES
        ('${user}', '${email}','${pass_encrypt}' ,'+51 994677567', NOW(), '1', '1', '1');`;
    const result = await db.query(sql);
    return res.status(200).json({
        msg: 'Se registró usuario',
        result
    });

}

module.exports = {
    usersGet,
    usersPost,
    usersPut
    // usuariosPatch,
    // usuariosDelete,
}