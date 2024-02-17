import transporter from "../config/nodemailer";

export const sendVerificationEmail = (email: string, token: string) => {
  const frontEndUrl = process.env.FRONTEND_URL;

  const mailOptions = {
    from: "Viktor Abrahamsson at WeekWise.se",
    to: email,
    subject: "Verify Email",
    html: `<div>Please click on this link <a href="${frontEndUrl}/register/${token}">${frontEndUrl}</a> to verify your email</div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};
