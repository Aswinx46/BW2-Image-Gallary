export const otpEmailTemplate = (otp: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f7;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
    }
    h2 {
      color: #333;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
      background-color: #f0f0f0;
      padding: 12px 20px;
      text-align: center;
      border-radius: 6px;
      margin: 20px 0;
      letter-spacing: 4px;
    }
    p {
      color: #555;
    }
    .footer {
      font-size: 12px;
      color: #999;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>OTP Verification</h2>
    <p>Hello,</p>
    <p>Use the following OTP to complete your verification. The OTP is valid for the next <strong>5 minutes</strong>:</p>
    <div class="otp">${otp}</div>
    <p>If you did not request this, you can safely ignore this email.</p>
    <p>Thank you!<br />Team {{APP_NAME}}</p>
    <div class="footer">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;
};