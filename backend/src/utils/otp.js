// utils/otp.js
const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Sinh số ngẫu nhiên 6 chữ số
    return otp;
};

module.exports = { generateOTP };