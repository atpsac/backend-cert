
const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPost, usersPut } = require('../controllers/users');
const { isRoleValid, isEmailValid, isIdValid, isUserNameValid } = require('../helpers/db-validator');
const { fieldValidator } = require('../middlewares/fields-validator');
const { jwtValidate } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/',
        [
                jwtValidate
        ],
        usersGet);

router.put('/:id',
        [
                check('id').custom((id) => isIdValid(id)),
                fieldValidator
        ], usersPut);

router.post('/',
        [
                jwtValidate,
                check('username', 'User es mandatorio').not().isEmpty(),
                check('username').custom(isUserNameValid),
                check('password', 'Password no es válido').isLength({ min: 6 }),
                // check('role').custom((role) => isRoleValid(role)),
                fieldValidator
        ], usersPost);

// router.delete('/', usuariosDelete );

// router.patch('/', usuariosPatch );

module.exports = router;