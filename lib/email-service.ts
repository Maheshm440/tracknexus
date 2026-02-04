import nodemailer from 'nodemailer';

interface SendOTPEmailParams {
  to: string;
  otp: string;
  name: string;
}

/**
 * Email Service for sending OTP verification emails
 */
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Send OTP verification email
   */
  async sendOTPEmail({ to, otp, name }: SendOTPEmailParams): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"${process.env.SMTP_FROM_NAME || 'TrackNexus'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to,
        subject: 'Verify Your Email - TrackNexus',
        html: this.getOTPEmailTemplate(otp, name),
        text: `Hi ${name},\n\nYour verification code is: ${otp}\n\nThis code expires in 15 minutes.\n\nIf you didn't request this code, please ignore this email.\n\nBest regards,\nTrackNexus Team`,
      };

      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error('Email sending error:', error);
      return false;
    }
  }

  /**
   * Get HTML email template for OTP
   */
  private getOTPEmailTemplate(otp: string, name: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
      padding: 40px 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      color: #333;
    }
    .message {
      font-size: 16px;
      color: #555;
      margin-bottom: 30px;
    }
    .otp-container {
      background: #f8f9fa;
      border: 2px dashed #0891b2;
      border-radius: 8px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
    }
    .otp-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .otp-code {
      font-size: 36px;
      font-weight: bold;
      color: #0891b2;
      letter-spacing: 8px;
      font-family: 'Courier New', monospace;
    }
    .expiry-notice {
      font-size: 14px;
      color: #e11d48;
      margin-top: 15px;
      font-weight: 500;
    }
    .info {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .info p {
      margin: 0;
      font-size: 14px;
      color: #92400e;
    }
    .footer {
      background: #f8f9fa;
      padding: 30px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .footer-links {
      margin-top: 15px;
    }
    .footer-links a {
      color: #0891b2;
      text-decoration: none;
      margin: 0 10px;
    }
    .social-icons {
      margin-top: 20px;
    }
    .social-icons a {
      display: inline-block;
      margin: 0 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TrackNexus</h1>
    </div>

    <div class="content">
      <div class="greeting">
        Hi ${name},
      </div>

      <div class="message">
        Thank you for signing up with TrackNexus! To complete your registration and verify your email address, please use the verification code below:
      </div>

      <div class="otp-container">
        <div class="otp-label">Your Verification Code</div>
        <div class="otp-code">${otp}</div>
        <div class="expiry-notice">⏱ This code expires in 15 minutes</div>
      </div>

      <div class="info">
        <p><strong>Security Tip:</strong> Never share this code with anyone. TrackNexus will never ask for your verification code via phone or email.</p>
      </div>

      <div class="message">
        If you didn't request this verification code, please ignore this email or contact our support team if you have concerns.
      </div>
    </div>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} TrackNexus. All rights reserved.</p>
      <div class="footer-links">
        <a href="https://tracknexus.com">Visit Website</a> |
        <a href="https://tracknexus.com/support">Support</a> |
        <a href="https://tracknexus.com/privacy">Privacy Policy</a>
      </div>
    </div>
  </div>
</body>
</html>
    `;
  }

  /**
   * Verify SMTP connection
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('SMTP connection error:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
