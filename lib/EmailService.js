import nodemailer from 'nodemailer';

const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    }
});
const SendEmail = async (to, subject, html) => {
    try {
        const from = process.env.EMAIL;
        const text = null;
        const mailOptions = { from, to, subject, text, html };
        const info = await Transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};

export default SendEmail;
