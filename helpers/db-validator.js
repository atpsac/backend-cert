const db = require('../database/db');

const isEmailValid = async (email = '') => {
    const eMailValidatorSql = `SELECT USERID, EMAIL FROM User WHERE EMAIL = '${email}';`;
    const emailExist = await db.query(eMailValidatorSql);
    if (Object.keys(emailExist).length != 0) {
        throw new Error(`Email ${email} no es válido`);
    }
};

const isUserIdValid = async (id = 0) => {
    const idValidatorSql = `SELECT USERID, USERNAME FROM User WHERE USERID = ${id};`;
    const idExist = await db.query(idValidatorSql);
    if (Object.keys(idExist).length == 0) {
        throw new Error(`Id ${id} no es válido`);
    }
};

const isUserNameValid = async (userName = '') => {
    const userNameValidatorSql = `SELECT UserId, UserName FROM User WHERE UserName = '${userName}';`;
    const userNameExist = await db.query(userNameValidatorSql);
    if (Object.keys(userNameExist).length == 1) {
        throw new Error(`UserName ${userName} no es válido`);
    }
};

const isRoleIdValid = async (roleId = 0) => {
    const roleValidatorSql = `SELECT ROLEID, ROLENAME FROM Role WHERE ROLEID = ${roleId};`;
    const roleIdExist = await db.query(roleValidatorSql);
    if ((Object.keys(roleIdExist).length) === 0) {
        throw new Error(`RoleId ${roleId} no es válido`);
    }
}

const isRoleNameValid = async (role = '') => {
    const roleValidatorSql = `SELECT ROLEID, ROLENAME FROM Role WHERE ROLENAME = '${role}';`;
    const roleExist = await db.query(roleValidatorSql);
    if (Object.keys(roleExist).length == 1) {
        throw new Error(`Role ${role} no es válido`);
    }
}

module.exports = {
    isRoleIdValid,
    isRoleNameValid,
    isEmailValid,
    isUserIdValid,
    isUserNameValid
};