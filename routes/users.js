
const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPost, usersPut } = require('../controllers/users');
const { isRoleValid, isEmailValid } = require('../helpers/db-validators');
const { fieldValidators } = require('../middlewares/fields-validators');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/',
        [       
                check('user', 'User is mandatory').not().isEmpty(),
                check('password', 'Password is not valid').isLength({min:6}),
                check('email', 'Email no valid').isEmail(),
                check('email').custom((email) => isEmailValid(email)),
                check('role').custom((role) => isRoleValid(role)),
                fieldValidators
        ], usersPost);

// router.delete('/', usuariosDelete );

// router.patch('/', usuariosPatch );

module.exports = router;