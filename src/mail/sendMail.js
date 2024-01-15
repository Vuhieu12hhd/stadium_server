const mailTransporter = require('.');
const templateBookingTicket = require('./template');
const { formatDateTime, formatNumber } = require('../utils/index');
require('dotenv').config();

const sendMailBookingTicketSuccess = (mailTo, ticket) => {
  const mailOptions = {
    from: process.env.MAIL_FROM, // Sender's email address
    to: mailTo, // Recipient's email address
    subject: 'Đặt vé thành công ', // Email subject
    // text: 'This is a test email from Node.js.', // Email text
    html: `<!DOCTYPE html>
    <html>
    
    <head>
        <style>
            /* Add your CSS styles here */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .email-header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .email-content {
                font-size: 16px;
            }
    
            .email-signature {
                font-style: italic;
                font-size: 14px;
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Xác nhận Đặt vé thành công</h1>
            </div>
            <div class="email-content">
                <p>Chào quý khách hàng,</p>
                <p>Chúc mừng bạn đã đặt vé thành công tại chúng tôi! Dưới đây là thông tin chi tiết về vé của bạn:</p>
                <ul>
                    <li>Mã vé: ${String(ticket.code).toUpperCase()}</li>
                    <li>Trận đấu: ${ticket.movie}</li>
                    <li>Ngày và giờ: ${formatDateTime(ticket.premiere)}</li>
                    <li>Địa điểm: ${ticket.room} - ${ticket.cinema}</li>
                    <li>Số lượng ghế: ${ticket.chairs.length}</li>
                    <li>Danh sách ghế: ${ticket.chairs.join(', ')}</li>
                    <li>Tổng cộng: ${formatNumber(ticket.value)} đ</li>
                </ul>
                <p>Chúng tôi rất mong được phục vụ bạn tại sự kiện và hy vọng bạn sẽ có một trải nghiệm thú vị.</p>
                <p>Cảm ơn bạn đã lựa chọn chúng tôi.</p>
            </div>
        </div>
    </body>
    
    </html>`,
  };

  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};
const sendMailCancelTicketSuccess = (mailTo, ticket) => {
  const mailOptions = {
    from: process.env.MAIL_FROM, // Sender's email address
    to: mailTo, // Recipient's email address
    subject: 'Thông báo hủy vé', // Email subject
    // text: 'This is a test email from Node.js.', // Email text
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác nhận hủy vé thành công</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #007bff;
                color: #fff;
                text-align: center;
                padding: 10px;
            }
            .content {
                padding: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <p>Chào quý khách hàng thân mến,</p>
                <p>Vé của bạn đã được hủy bỏ.</p>
                <p>Thông tin vé:</p>
                <ul>
                    <li>Mã vé: ${String(ticket.code).toUpperCase()}</li>
                    <li>Trận đấu: ${ticket.movie}</li>
                    <li>Ngày và giờ: ${formatDateTime(ticket.premiere)}</li>
                    <li>Địa điểm: ${ticket.room} - ${ticket.cinema}</li>
                    <li>Số lượng ghế: ${ticket.chairs.length}</li>
                    <li>Danh sách ghế: ${ticket.chairs.join(', ')}</li>
                    <li>Tổng cộng: ${formatNumber(ticket.value)} đ</li>
                </ul>
                <p>Xin cảm ơn sự hiểu thông của quý vị và sự ủng hộ của quý vị đối với chúng tôi.</p>
                <p>Trân trọng,<br>
                </p>
            </div>
        </div>
    </body>
    </html>
    `,
  };

  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};
const sendMailRegisterSuccess = (mailTo, token) => {
  const mailOptions = {
    from: process.env.MAIL_FROM, // Sender's email address
    to: mailTo, // Recipient's email address
    subject: 'Xác minh tài khoản', // Email subject
    // text: 'This is a test email from Node.js.', // Email text
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác Minh Tài Khoản</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #007bff;
                color: #000;
                text-align: center;
                padding: 10px;
            }
            .content {
                padding: 20px;
            }
            .verify-button {
                text-align: center;
                padding: 10px;
                text-decoration: none;
                display: inline-block;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <p>Chào quý khách hàng thân mến,</p>
                <p>Cảm ơn bạn đã đăng ký tài khoản tại K+ Sport. Để hoàn tất quá trình đăng ký và xác minh tài khoản của bạn, vui lòng nhấn vào nút bên dưới:</p>
                <a href="${process.env.HOST}/auth/verify-email?token=${token}" class="verify-button">Xác Minh Tài Khoản</a>
                <p>Nếu bạn không thực hiện đăng ký này, bạn có thể bỏ qua email này.</p>
                <p>Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                <p>Trân trọng,<br>
                    K+ Sport
                </p>
            </div>
        </div>
    </body>
    </html>
    `,
  };

  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};

const sendMailForgotPassword = (mailTo, token) => {
  const mailOptions = {
    from: process.env.MAIL_FROM, // Sender's email address
    to: mailTo, // Recipient's email address
    subject: 'Lấy lại mật khẩu', // Email subject
    // text: 'This is a test email from Node.js.', // Email text
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #007bff;
                color: #fff;
                text-align: center;
                padding: 10px;
            }
            .content {
                padding: 20px;
            }
            .reset-button {
                color: #007bff;
                text-align: center;
                padding: 10px;
                text-decoration: none;
                display: inline-block;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <p>Chào quý khách hàng thân mến,</p>
                <p>Chúng tôi đã nhận được yêu cầu lấy lại mật khẩu của bạn. Để đặt lại mật khẩu của bạn, vui lòng nhấn vào nút bên dưới:</p>
                <a href="${process.env.FRONTEND_HOST}/auth/forgot-password?token=${token}" class="reset-button">Đặt Lại Mật Khẩu</a>
                <p>Nếu bạn không thực hiện yêu cầu này, bạn có thể bỏ qua email này.</p>
                <p>Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
                <p>Trân trọng,<br>
                  K+ Sport
                </p>
            </div>
        </div>
    </body>
    </html>
    `,
  };
  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};

module.exports = {
  sendMailBookingTicketSuccess,
  sendMailCancelTicketSuccess,
  sendMailRegisterSuccess,
  sendMailForgotPassword,
};
