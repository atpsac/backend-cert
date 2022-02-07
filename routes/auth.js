const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { isUserNameValid } = require('../helpers/db-validators');
const { fieldValidators } = require('../middlewares/fields-validators');

const router = Router();

router.post('/login',
    [
        check('userName', 'Username is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        // check('UserName').custom((userName) => isUserNameValid(userName)),
        fieldValidators
    ]
    , login);

module.exports = router;