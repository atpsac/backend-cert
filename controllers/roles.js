const { response, request } = require('express');
const db = require('../database/db');
const bcryptjs = require('bcryptjs');

const roleGetbyId = async (req = request, res = response) => {
    try {
        const { id: roleId } = req.params;
        const sql = `CALL sp_getRole(?);`;

        const result = await db.query(sql, [roleId]);
        const [data] = result;

        if (data.length === 0) {
            return res.status(401).json({
                msg: 'No existe rol'
            });
        }

        return res.status(200).json({
            msg: 'Role obtenido',
            result
        });

    }
    catch (error) {
        res.status(401).json({
            msg: 'No se pudo obtener los datos',
            error
        });
    }
};

const rolesGet = async (req = request, res = response) => {

    const { skip = 0, limit = 5 } = req.query;
    const sql = `CALL sp_getRoles(?,?)`;

    try {
        const result = await db.query(sql, [skip, limit]);
        return res.status(200).json({
            msg: 'Listado de roles',
            result
        });
    }
    catch (error) {
        res.status(401).json({
            msg: 'No se pudo obtener los datos',
            error
        });
    }

};

const rolesPost = async (req = request, res = response) => {
    try {
        const userTokenId = req.user.UserId;
        const { rolename: roleName } = req.body;

        const sql = `CALL sp_createRole(?, ?)`;
        const result = await db.query(sql, [roleName, userTokenId]);

        if (result.affectedRows == 1) {
            return res.status(200).json({
                msg: 'Se registro rol',
                result
            });
        }

    }
    catch (error) {
        res.status(401).json({
            msg: 'No se registró el rol',
            error
        });
    }
};

module.exports = {
    roleGetbyId,
    rolesGet,
    rolesPost
};
