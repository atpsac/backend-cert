const { response, request } = require('express');
const db = require('../database/db');
const bcryptjs = require('bcryptjs');

const usersGet = async (req = request, res = response) => {

    const sql = `CALL sp_getUsers();`;
    try {
        const result = await db.query(sql);
        return res.status(200).json({
            msg: 'Listado de usuarios',
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

    const sql = `CALL sp_UserUpdate(?, ?, ?, ?, ?, ?);`;
    const result = await db.query(sql, [id, userName, email, password, phoneNumber, updateUser]);

    return res.status(200).json({
        msg: 'Registro actualizado',
        result
    });

};

const usersPost = async (req = request, res = response) => {
    try {

        const userTokenId = req.user.UserId;
        const { username: userName, password } = req.body;
        const salt = bcryptjs.genSaltSync();
        const passEncrypt = bcryptjs.hashSync(password, salt);

        const sql = `CALL sp_createUser(?,?,?,?)`;
        const result = await db.query(sql, [userName, passEncrypt, userTokenId]);

        if (result.affectedRows == 1) {
            return res.status(200).json({
                msg: 'Se registró usuario',
                result
            });
        }

    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    usersGet,
    usersPost,
    usersPut
    // usuariosPatch,
    // usuariosDelete,
}