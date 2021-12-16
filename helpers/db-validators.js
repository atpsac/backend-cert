const db = require('../database/db');

const isRoleValid = async(role = '') => {
    const roleValidatorSql = `SELECT ROLEID, NAME FROM ROLE WHERE NAME = '${role}';`;
    const roleExist = await db.query(roleValidatorSql);
    if(Object.keys(roleExist).length == 0) {
        throw new Error(`Role ${role} is not valid`);
    }
}

const isEmailValid = async(email = '') => {
    const eMailValidatorSql = `SELECT USERID, EMAIL FROM USER WHERE EMAIL = '${email}';`;
    const emailExist = await db.query(eMailValidatorSql);
    if (Object.keys(emailExist).length != 0) {
        console.log(Object.keys(emailExist).length);
        throw new Error(`Email ${email} is not valid`);
    }
};

module.exports = {
    isRoleValid,
    isEmailValid
};