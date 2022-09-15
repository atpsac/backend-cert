
const { Router } = require('express');
const { check } = require('express-validator');

const { roleGetbyId, rolesGet, rolesPost } = require('../controllers/roles');
const { isRoleNameValid, isRoleIdValid } = require('../helpers/db-validator');
const { fieldValidator } = require('../middlewares/fields-validator');
const { jwtValidate } = require('../middlewares/jwt-validator');

const router = Router();

router.get('/:id',
    [
        jwtValidate,
        check('id').custom((id) => isRoleIdValid(id)),
        fieldValidator,
    ],
    roleGetbyId);

router.get('/',
    [
        jwtValidate
    ],
    rolesGet);

router.post('/',
    [
        jwtValidate,
        check('rolename', 'RoleName es mandatorio').not().isEmpty(),
        check('rolename').custom(isRoleNameValid),
        fieldValidator,
    ],
    rolesPost);

module.exports = router;