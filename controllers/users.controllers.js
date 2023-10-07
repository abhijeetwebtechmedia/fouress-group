const User_Model = require("../models/users.models");

class User_Controller {
    static async fetchingUsers(req, res) {
        try {
            const users = await User_Model.findAll();
            return res.status(200).json({
                status: true,
                message: 'List of all the users.',
                data: users,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

    static async loggingUsingPhone(req, res) {
        try {
            const { phoneNumber } = req.body;

            const isUser = await User_Model.findOne({ where: { phoneNumber } });

            if (isUser) {
                const otp = User_Controller.generateOtp(6);
                return res.status(200).json({
                    status: true,
                    message: 'Logged in successfully.',
                    otp: otp,
                });
            }

            await User_Model.create({ phoneNumber: phoneNumber });
            const otp = User_Controller.generateOtp(6);
            return res.status(200).json({
                status: true,
                message: 'Logged in successfully.',
                otp: otp,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

    static async otpVerification(req, res) {
        try {
            const { otp } = req.body;
            const otpFromLocalStorage = req.headers.otp;

            if (otp == otpFromLocalStorage) {
                return res.status(200).json({
                    status: true,
                    message: 'Verification successful.'
                })
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Invalid response from server for verification'
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: 'Error: ' + error.message,
            });
        }
    }

    static generateOtp(length) {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp.toString();
    }
}

module.exports = User_Controller;
