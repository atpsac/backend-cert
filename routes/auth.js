const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { isUserNameValid } = require('../helpers/db-validator');
const { fieldValidator } = require('../middlewares/fields-validator');

const router = Router();

router.post('/login',
    [
        check('username', 'Username es requerido').not().isEmpty(),
        check('password', 'Password es requerido').not().isEmpty(),
        // check('UserName').custom((userName) => isUserNameValid(userName)),
        fieldValidator
    ]
    , login);

module.exports = router;