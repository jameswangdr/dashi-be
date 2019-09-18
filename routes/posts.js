const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.post.index);
router.get('/:id', ctrl.post.show);
router.post('/', ctrl.post.create);
router.put('/:_id', ctrl.post.update);
router.delete('/:_id', ctrl.post.destroy);

// Post Comments
router.get('/:post_id/comments', ctrl.comment.index);
router.post('/:post_id/comments', ctrl.comment.create);

module.exports = router;
