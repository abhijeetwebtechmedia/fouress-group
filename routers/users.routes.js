const express = require('express');
const User_Controller = require('../controllers/users.controllers');


class User_Router {
    constructor() {
        this.router = express.Router();

        this.initializeRouter();
    }

    initializeRouter() {
        this.router.get('/', User_Controller.fetchingUsers);
        this.router.post('/login-with-phone', User_Controller.loggingUsingPhone);
        this.router.post('/otp-verify', User_Controller.otpVerification);
    }

    getRouter() {
        return this.router;
    }
}


module.exports = new User_Router;