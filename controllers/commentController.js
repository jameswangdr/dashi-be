const db = require('../models');
const { sendErrorResponse, sendSuccessResponse } = require('./response') 

const index = (req, res) => {
    db.Comment.find({ post: req.params.post_id }, (err, foundComments) => {
        // Handle Error

        sendSuccessResponse(res, foundComments);
    })
}

const show = (req, res) => {
    db.Comment.findById({ _id: req.params._id }, (error, foundOneComment) => {
        if (error) return sendErrorResponse(res, error);
        sendSuccessResponse(res, foundOneComment);
    });
};

const create = (req, res) => {
    db.Comment.create(req.body, (error, createdComment) => {
        if (error) return sendErrorResponse(res, error);
        // db.User.findById(req.body.userId, {password: 0}, (error,foundUser)=>{
            if (error) return sendErrorResponse(res, error);
            createdComment.user = req.session.currentUser.id;
            createdComment.save((error, savedComment) => {
                if (error) return sendErrorResponse(res, error);
                db.Post.findById(req.params.post_id, (error, foundPost)=>{
                    if (error) return sendErrorResponse(res, error);
                    console.log(foundPost);
                    if (foundPost.recent_comments.length === 3) {
                        foundPost.recent_comments.shift();
                        foundPost.recent_comments.push(createdComment);
                    } else {
                        foundPost.recent_comments.push(createdComment);
                    };
                    foundPost.save();
                    //     (error, savedPost) => {
                    //     if (error) return sendErrorResponse(res, error);
                        sendSuccessResponse(res, createdComment);
                    // });
                });
            });
        // });
    });
};

const destroy = (req, res) => {
    db.Comment.findByIdAndDelete({ _id: req.params._id }, (error, deletedComment) => {
        if (error) return sendErrorResponse( res, error);
        sendSuccessResponse(res, deletedComment);
    })
};

module.exports = {
    index,
    show,
    create,
    destroy
};