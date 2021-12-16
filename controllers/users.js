const { response, request } = require('express');
const db = require('../database/db');
const bcryptjs = require('bcryptjs');

const usersGet = async (req = request, res = response) => {

    const sql = 'SELECT * FROM USER';
    const data = await db.query(sql);
    console.log(data);

    //const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        data
    });
}

const usersPut = async (req = request, res = response) => {

    const {id} = req.params;
    const data = req.body;
    console.log(data);

    const result = await db.query();

    res.json({
        data
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