import nodemailer from 'nodemailer'
import Config from '../config/serverConfigs.js'
const config = new Config();

// Create a transporter object using SMTP transport
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.adminEmail,
        pass: config.adminEmailPass
    }
});
