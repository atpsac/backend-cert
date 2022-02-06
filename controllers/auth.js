const { response } = require('express');

const login = async (req, res = response) => {

    const { userName, password } = req.body;

    try {

        // Verify if email is exist
        const sql = `SELECT UserId, UserName FROM User WHERE UserName = '${userName}';`;
        const result = await db.query(sql);
        console.log(result);

        if ( !result ) {
            return res.status().json({
                msg : 'User/Password is not valid'
            });
        }

        res.json({
            msg: 'Login ok!'
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