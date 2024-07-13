const fs = require('fs');
const path = require('path');

const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');

const Email = require('../models/emails');

dotenv.config();

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
const AuthController = {
    sendEmail: async (req, res) => {
        const { email, name, message, href } = req.body;

        if (!email || !name || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Only POST requests are allowed' });
        }

        const templatePath = path.join(__dirname, '../templates/thankYouEmail.html');

        let html = fs.readFileSync(templatePath, 'utf8');

        html = html.replace('{{name}}', name);
        html = html.replace("{{href}}", href)

        const newEmail = new Email({
            email,
            name,
            message
        });

        await newEmail.save()

        await res.status(201).json({ message: 'Email sent successfully' });

        return transporter.sendMail({
            to: email,
            subject: 'Thank You!',
            html: html
        });
    }
}

module.exports = AuthController;