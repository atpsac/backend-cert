const { response, request } = require('express');
const db = require('../database/db');
const bcryptjs = require('bcryptjs');

const userGetById = async (req = request, res = response) => {
    try {
        const { id: userId } = req.params;
        const sql = `CALL sp_getUser(?);`;

        const result = await db.query(sql, [userId]);
        const [data] = result;

        if (data.length === 0) {
            return res.status(401).json({
                msg: 'No existe usuario'
            })
        }

        return res.status(200).json({
            msg: 'Usuario obtenido',
            result
        });

    } catch (error) {
        res.status(401).json({
            msg: 'No se pudo obtener los datos',
            error
        })
    }
};


const usersGet = async (req = request, res = response) => {

    const { skip = 0, limit = 5 } = req.query;
    const sql = `CALL sp_getUsers(?,?);`;
    try {
        const result = await db.query(sql, [skip, limit]);
        return res.status(200).json({
            msg: 'Listado de usuarios',
            result
        });
    } catch (error) {
        res.status(401).json({
            msg: 'No se pudo obtener los datos',
            error
        })
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
        res.status(400).json({
            msg: 'No se registró el rol',
            error
        });
    }
}

module.exports = {
    userGetById,
    usersGet,
    usersPost,
    usersPut,

    // usuariosPatch,
    // usuariosDelete,
}