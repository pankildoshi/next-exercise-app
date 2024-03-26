import nodemailer from "nodemailer";

export const sendmail = async (email, firstName, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const verficationLink =
    process.env.BASE_APP_URL + `auth/verifymail?token=${verificationToken}`;
  const emailVerificationTemplate = getEmailVerificationTemplate(
    firstName,
    verficationLink
  );

  const mailOptions = {
    from: `Exercise App <${process.env.GMAIL_USERNAME}>`,
    to: email,
    subject: "Email Verification - Exercise App",
    html: emailVerificationTemplate,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

export const generateVerificationToken = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const getEmailVerificationTemplate = (firstName, verficationLink) => {
  const emailVerificationTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff;">
      <tr>
        <td style="padding: 20px 0; text-align: center;">
          <h2>Email Verification</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <p>Dear ${firstName},</p>
          <p>Thank you for signing up. To complete your registration, please click the button below to verify your email address:</p>
          <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <a href="${verficationLink}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <p>If you did not sign up for our service, you can safely ignore this email.</p>
          <p>Thank you,</p>
          <p>Exercise App</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; text-align: center; background-color: #f0f0f0;">
          <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
  return emailVerificationTemplate;
};
