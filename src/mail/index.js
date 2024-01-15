const nodemailer = require('nodemailer');
require('dotenv').config();

const mailTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports = mailTransporter;
