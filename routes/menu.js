
const { Router } = require('express');
const { menuGet } = require('../controllers/menu');
// const { check } = require('express-validator');

const router = Router();

router.get('/', menuGet);

module.exports = router;