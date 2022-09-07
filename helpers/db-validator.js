const db = require('../database/db');

const isRoleValid = async (role = '') => {
    const roleValidatorSql = `SELECT ROLEID, NAME FROM Role WHERE NAME = '${role}';`;
    const roleExist = await db.query(roleValidatorSql);
    if (Object.keys(roleExist).length == 0) {
        throw new Error(`Role ${role} no es válido`);
    }
}

const isEmailValid = async (email = '') => {
    const eMailValidatorSql = `SELECT USERID, EMAIL FROM User WHERE EMAIL = '${email}';`;
    const emailExist = await db.query(eMailValidatorSql);
    if (Object.keys(emailExist).length != 0) {
        console.log(Object.keys(emailExist).length);
        throw new Error(`Email ${email} no es válido`);
    }
};

const isIdValid = async (id = 0) => {
    const idValidatorSql = `SELECT USERID, USERNAME FROM User WHERE USERID = ${id};`;
    const idExist = await db.query(idValidatorSql);
    if (Object.keys(idExist).length == 0) {
        console.log(Object.keys(idExist).length);
        throw new Error(`Id ${id} no es válido`);
    }
};

const isUserNameValid = async (userName = '') => {
    const userNameValidatorSql = `SELECT UserId, UserName FROM User WHERE UserName = '${userName}';`;
    const userNameExist = await db.query(userNameValidatorSql);
    if (Object.keys(userNameExist).length == 1) {
        console.log(Object.keys(userNameExist).length);
        throw new Error(`UserName ${userName} no es válido`);
    }
};

module.exports = {
    isRoleValid,
    isEmailValid,
    isIdValid,
    isUserNameValid
};