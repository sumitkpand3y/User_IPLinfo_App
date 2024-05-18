import UserService from '../services/user-service.js';
import { IplTeamRepository } from "../repository/index.js";
import { transporter } from '../utils/email.js';
import Config from '../config/serverConfigs.js'
const config = new Config();
import { io } from '../index.js';

let iplTeamRepository = new IplTeamRepository()
let userService = new UserService()
// Patch -> /city/:id -> req.body
export const updateTeam = async (req, res) => {
    try {
        let userId = req.user._id
        let selectTeam = await iplTeamRepository.get(req.body.selectTeam)
        // Email content
        io.emit("notify", req.user._id);
        const mailOptions = {
            from: config.adminEmail,
            to: req.user.email,
            subject: 'Updated the  your favorite IPL team',
            text: `You have subscribe to your favorite IPL team : ${selectTeam.name}`
        };
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error occurred while sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        const response = await userService.updateTeam(userId, req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully updated a team',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to update team',
            err: error
        });
    }
}

export const getUser = async (req, res) => {
    try {
        let userId = req.user._id
        const response = await userService.get(userId);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched user',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}

export const getUserDetails = async (req, res) => {
    try {
        // let userId = req.user._id
        if (req.user.isAdmin) {
            const response = await userService.getAll();
            return res.status(200).json({
                success: true,
                message: 'Successfully fetched all user',
                data: response,
                err:  {}
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'User should be admin to fetch all user details',
                data: {},
                err: "Unauthorised user"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}

export const updateUserDetails = async (req, res) => {
    try {
        // let userId = req.user._id
        if (req.user.isAdmin) {
            const response = await userService.updateUserDetails(req.body);
            return res.status(200).json({
                success: true,
                message: 'Successfully fetched all user',
                data: {},
                err:  {}
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'User should be admin to fetch all user details',
                data: {},
                err: "Unauthorised user"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}