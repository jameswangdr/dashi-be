const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:_id', ctrl.user.show);
router.get('/', ctrl.user.index);
router.put('/:_id', ctrl.user.update);

module.exports = router;
