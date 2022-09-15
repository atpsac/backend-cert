
const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPost, usersPut, userGetById } = require('../controllers/users');
const { isRoleValid, isEmailValid, isUserIdValid, isUserNameValid } = require('../helpers/db-validator');
const { fieldValidator } = require('../middlewares/fields-validator');
const { jwtValidate } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/',
        [
                jwtValidate
        ],
        usersGet);

router.get('/:id',
        [
                jwtValidate,
                check('id').custom((id) => isUserIdValid(id)),
                fieldValidator,
        ],
        userGetById);

router.put('/:id',
        [
                check('id').custom((id) => isUserIdValid(id)),
                fieldValidator
        ], usersPut);

router.post('/',
        [
                jwtValidate,
                check('username', 'User es mandatorio').not().isEmpty(),
                check('username').custom(isUserNameValid),
                check('password', 'Password no es válido').isLength({ min: 6 }),
                fieldValidator
        ], usersPost);

// router.delete('/', usuariosDelete );

// router.patch('/', usuariosPatch );

module.exports = router;