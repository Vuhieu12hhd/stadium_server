const templateBookingTicket = `
<!DOCTYPE html>
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
            <p>Chúc mừng bạn đã đặt vé thành công tại chúng tôi! Dưới đây là thông tin chi tiết về đơn đặt hàng của bạn:</p>
            <ul>
                <li>Tên sự kiện: [Tên sự kiện]</li>
                <li>Ngày và giờ: [Ngày và giờ]</li>
                <li>Địa điểm: [Địa điểm]</li>
                <li>Số lượng vé: [Số lượng vé]</li>
                <li>Tổng cộng: [Tổng cộng]</li>
            </ul>
            <p>Chúng tôi rất mong được phục vụ bạn tại sự kiện và hy vọng bạn sẽ có một trải nghiệm thú vị.</p>
            <p>Dưới đây là thông tin vé của bạn:</p>
            <ul>
                <li>Mã vé: [Mã vé]</li>
                <li>Tên khách hàng: [Tên khách hàng]</li>
                <li>Email liên hệ: [Email liên hệ]</li>
                <li>Số điện thoại liên hệ: [Số điện thoại liên hệ]</li>
            </ul>
            <p>Vui lòng lưu ý các điều sau:</p>
            <ol>
                <li>Vui lòng xuất trình vé này tại cửa vào sự kiện.</li>
                <li>Đặt vé của bạn đã được xác nhận và không thể hoàn lại.</li>
                <li>Liên hệ với chúng tôi tại [Số điện thoại liên hệ] hoặc [Email liên hệ] nếu bạn có bất kỳ câu hỏi hoặc yêu cầu đặc biệt nào.</li>
            </ol>
            <p>Một lần nữa, cảm ơn bạn đã lựa chọn chúng tôi và chúng tôi rất mong gặp bạn tại sự kiện sắp tới.</p>
        </div>
        <div class="email-signature">
            Trân trọng, [Tên tổ chức hoặc công ty của bạn]
        </div>
    </div>
</body>

</html>
`;
module.exports = { templateBookingTicket };
