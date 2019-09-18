const bcrypt = require('bcryptjs');
const db = require('../models');
const validate = require('../validation/register');

// POST to register
const register = (req, res) => {
    const { errors, notValid } = validate(req.body);

    if (notValid) {
        return res.status(400).json({ status: 400, errors });
    }
    // Verify Account Does Not Already Exist
    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.status(500).json({ status: 500, errors: [{ message: 'Something went wrong. Please try again' }] });
        if (foundUser) return res.status(400).json({ status: 400, errors: [{ message: 'Email address has already been registered. Please try again' }] });
        // Generate Salt (Asynchronous callback version)
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({ status: 500, errors: [{ message: 'Something went wrong. Please try again' }] });
            // Hash User Password
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({ status: 500, errors: [{ message: 'Something went wrong. Please try again' }] });
                const newUser = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                }

                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json({ status: 500, errors: [{ message: 'Something went wrong. Please try again' }] });
                    res.status(201).json({ status: 201, message: 'success' });
                });
            });
        });
    });
};

// POST to login
const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ status: 400, errors: [{ message: 'Please enter your email and password' }] });
    }

    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.status(500).json({ status: 500, errors: [{ message: 'Something went wrong. Please try again' }] });
        if (!foundUser) {
            return res.status(400).json({ status: 400, errors: [{ message: 'Email or password is incorrect' }] });
        }

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({ status: 500, errors: [{ message: 'Something went wrong. Please try again' }] });
            if (isMatch) {
                req.session.loggedIn = true;
                req.session.currentUser = { id: foundUser._id };
                return res.status(200).json({ status: 200, message: 'Success', id: foundUser._id, username: foundUser.username });
            } else {
                return res.status(400).json({ status: 400, errors: [{ message: 'Email or password is incorrect' }] });
            }

        });
    });
};

// POST to logout
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ status: 500, errors: [{ message: 'Something went wrong, please try again' }] });

        res.sendStatus(200);
    });
};

// POST to verify
const verify = (req, res) => {
    if (!req.session.loggedIn) return res.status(401).json({ status: 401, message: "Unauthorized. Please login and try again" });
    res.status(200).json({
        status: 200, message: `Current user verified.
    User ID = ${req.session.currentUser.id}`
    });
}

module.exports = {
    register,
    login,
    logout,
    verify,
};
