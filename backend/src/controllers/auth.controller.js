const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, sendResetPasswordEmail } = require('../services');
const { User } = require('../models');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../services/email.service');  // Đường dẫn tùy theo project



// const register = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.status(httpStatus.CREATED).send({ user, tokens });
// });

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  // Tạo OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 phút
  await user.save();

  // Gửi email OTP
  await emailService.sendEmail(user.email, 'Email Verification OTP', `Your OTP is: ${otp}`);

  res.status(httpStatus.CREATED).send({ message: 'User registered. OTP sent to email for verification.' });
});


const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});


const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});


const sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP hết hạn sau 10 phút
  await user.save();

  // Gửi email (hoặc SMS)
  await emailService.sendEmail(email, 'Your OTP Code', `Your OTP is: ${otp}`);

  res.status(httpStatus.OK).send({ message: 'OTP sent' });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await userService.getUserByEmail(email);

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid or expired OTP');
  }


  user.isEmailVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  sendOtp,
  verifyOtp,

};
