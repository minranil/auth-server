import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: process.env.TRANSPORTER_SERVICE,
    auth: {
        user: process.env.TRANSPORTER_EMAIL,
        pass: process.env.TRANSPORTER_PASSWORD
    }
});

async function sendEmail(to, subject, html) {
    await transporter.sendMail({
        from: `"No Reply" <${process.env.TRANSPORTER_EMAIL}>`,
        to,
        subject,
        html
    });
}

export default sendEmail;