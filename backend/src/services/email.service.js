const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};


const sendResetPasswordEmail = async (to) => {
  const subject = 'Your New Password';

  // Tạo mật khẩu ngẫu nhiên
  const newPassword = crypto.randomBytes(6).toString('hex'); // VD: "a3f2b9c8"
  const hashedPassword = await bcrypt.hash(newPassword, 10); // Mã hóa mật khẩu

  // Cập nhật mật khẩu mới vào database
  await updateUserPassword(to, hashedPassword);

  const text = `Dear user,
Your password has been reset successfully. Your new password is: ${newPassword}
Please log in and change your password as soon as possible for security reasons.`;

  await sendEmail(to, subject, text);
};

module.exports = { sendResetPasswordEmail };

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';

  const text = `Dear user, You are receiving this email because you (or someone else) have created a new account at FashionApp.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
}


