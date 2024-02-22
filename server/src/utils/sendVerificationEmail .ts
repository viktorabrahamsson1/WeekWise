import transporter from "../config/nodemailer";

export const sendVerificationEmail = (email: string, token: string) => {
  const frontEndUrl = process.env.FRONTEND_URL;

  const mailOptions = {
    from: "Viktor Abrahamsson at WeekWise.se",
    to: email,
    subject: "Verify Email",
    html: `<div>Hi 👋, Please click on this link <a href="${frontEndUrl}/register/${token}">${frontEndUrl}</a> to verify your email. \n 
    <span>Please check your spam folder if the email does not appear.</span> </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

export const sendVerificationPassword = (
  email: string,
  passwordToken: string
) => {
  const frontEndUrl = process.env.FRONTEND_URL;

  const mailOptions = {
    from: "Viktor Abrahamsson at WeekWise.se",
    to: email,
    subject: "Verify Password change",
    html: `<div>Hi 👋, Please click on this link <a href="${frontEndUrl}/forgotPassword/${passwordToken}">${frontEndUrl}</a> to verify your password change. \n 
    <span>Please check your spam folder if the email does not appear.</span> </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};
