const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// router.get('/:_id', ctrl.comment.show);
router.post('/', ctrl.comment.create);
router.delete('/:_id', ctrl.comment.destroy);

module.exports = router;