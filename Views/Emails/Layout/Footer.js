const Footer = ( OrderData ) => {
    const isAdmin = OrderData?.Email?.isAdminNotification;
    return (
        `<div style="text-align: center; margin: 30px 0;">
            <a href="${isAdmin ? `https://www.food.arkshgroup.com/admin/orders/${OrderData._id}` : 'https://www.food.arkshgroup.com/account'}"
                style="display: inline-block; background: linear-gradient(135deg, #0055a4 0%, #29abe2 100%); color: #ffffff !important; text-decoration: none; padding: 14px 30px; font-weight: 600; font-size: 16px; border-radius: 30px; box-shadow: 0 4px 10px rgba(0, 85, 164, 0.3);">
                ${isAdmin ? 'View Order Details' : 'Track Your Order'}
            </a>
        </div>

        ${!isAdmin ? `
        <!-- Help Section -->
        <div
            style="background: linear-gradient(135deg, #f8fbff 0%, #edf5ff 100%); padding: 25px; margin: 30px 0; text-align: center; border-radius: 10px;">
            <h3
                style="color: #0055a4; font-size: 18px; font-weight: 600; margin-bottom: 15px; margin: 0 0 15px 0; padding: 0; line-height: 1.6;">
                Need Help?</h3>
            <p
                style="color: #555555; font-size: 14px; margin-bottom: 20px; margin: 0 0 20px 0; padding: 0; line-height: 1.6;">
                If you have any questions or concerns about your order, please don't hesitate to contact our
                customer support team.</p>

            <p
                style="color: #0055a4; font-size: 14px; font-weight: 600; margin: 10px 0; padding: 0; line-height: 1.6;">
                Email: info@arkshgroup.com</p>
            <p
                style="color: #0055a4; font-size: 14px; font-weight: 600; margin: 10px 0; padding: 0; line-height: 1.6;">
                Phone: +977-9802074449</p>
        </div>
        ` : ''}

        <!-- Footer -->
        <tr>
            <td align="center"
                style="background: linear-gradient(135deg, #0055a4 0%, #29abe2 100%); padding: 30px 20px; text-align: center;">
                <div style="margin: 20px 0;">
                    <a href="https://www.facebook.com/Arksh.Food"
                        style="display: inline-block; margin: 0 10px; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none;">Facebook</a>
                    <a href="https://www.instagram.com/arksh.food/"
                        style="display: inline-block; margin: 0 10px; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none;">Instagram</a>
                    <a href="https://www.tiktok.com/@arksh.food"
                        style="display: inline-block; margin: 0 10px; color: #ffffff; font-weight: 600; font-size: 14px; text-decoration: none;">TikTok</a>
                </div>

                <div style="margin: 20px 0;">
                    <a href="https://www.food.arkshgroup.com/privacy-policy"
                        style="color: #ffffff; text-decoration: none; margin: 0 10px; font-size: 14px;">Privacy Policy</a>
                    <a href="https://www.food.arkshgroup.com/terms-and-conditions"
                        style="color: #ffffff; text-decoration: none; margin: 0 10px; font-size: 14px;">Terms of Service</a>
                    <a href="https://www.food.arkshgroup.com/about-us"
                        style="color: #ffffff; text-decoration: none; margin: 0 10px; font-size: 14px;">About Us</a>
                </div>

                <p style="font-size: 12px; color: rgba(255, 255, 255, 0.8); margin: 20px 0 0 0; padding: 0; line-height: 1.6;">
                    &copy; ${new Date().getFullYear()} ARKSH Group. All rights reserved.
                </p>
            </td>
        </tr>
        `
    );
};

export default Footer;
