import { format } from 'date-fns';
import Footer from "./Layout/Footer";
import OrderSummary from "./Layout/OrderSummary";

export default function NotifyUser(OrderData) {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .ContentSecion {
            padding: 30px 25px;
            background-color: #ffffff;
        }

        @media (max-width: 768px) {
            .ContentSecion {
                padding: 30px 10px;
            }
        }

         @media screen and (max-width: 600px) {
                table[class="container"] {
                    width: 100% !important;
                    max-width: 100% !important;
                }

                td[class="content-padding"] {
                    padding: 20px 15px !important;
                }

                td[class="header"] {
                    padding: 20px 15px !important;
                }

                div[class="logo-container"] {
                    width: 90px !important;
                    height: 90px !important;
                }

                h1 {
                    font-size: 22px !important;
                }

                h2 {
                    font-size: 16px !important;
                }

                p {
                    font-size: 14px !important;
                }

                td[width="50%"] {
                    display: block !important;
                    width: 100% !important;
                }

                td[width="50%"][align="right"] {
                    text-align: left !important;
                    padding-top: 8px !important;
                }

                td[width="70%"],
                td[width="30%"] {
                    display: block !important;
                    width: 100% !important;
                    text-align: center !important;
                }

                td[width="30%"][align="right"] {
                    text-align: center !important;
                    padding-top: 10px !important;
                }

                a[class="button"] {
                    display: block !important;
                    width: 100% !important;
                    padding: 12px 0 !important;
                }

                div[class="social-links"] a {
                    display: block !important;
                    margin: 10px 0 !important;
                }

                div[class="footer-links"] a {
                    display: block !important;
                    margin: 10px 0 !important;
                }
            }
    </style>
</head>

<body
    style="background-color: #f5f7fa; color: #333333; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: 'Segoe UI', Arial, Helvetica, sans-serif; line-height: 1.6;">
    <center>
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
            style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
            <!-- Header Section -->
            <tr>
                <td align="center"
                    style="background: linear-gradient(135deg, #0055a4 0%, #29abe2 100%); text-align: center; padding: 30px 20px 20px; border-bottom: 1px solid #eaeef3;">
                    <h1
                        style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 10px; margin: 0; padding: 0; line-height: 1.6;">
                        Order Confirmed!</h1>
                    <p style="font-size: 16px; color: #fff; font-weight: 500; margin: 0; padding: 0; line-height: 1.6;">
                        Thank you for shopping with ARKSH Food</p>
                </td>
            </tr>

            <!-- Content Section -->
            <tr>
                <td class="ContentSecion">
                    <!-- Greeting -->
                    <div
                        style="font-size: 18px; color: #444444; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px dashed #eaeef3;">
                        Hello <span style="color: #0055a4; font-weight: 600;">${OrderData.UserID.Name}</span>,
                        <p style="margin-top: 10px; margin: 0; padding: 0; line-height: 1.6;">Your order has been
                            confirmed and is now being processed. We'll send you another email when your order ships.
                        </p>
                    </div>

                    <!-- Order Info Box -->
                    <div
                        style="background: linear-gradient(135deg, #f8fbff 0%, #edf5ff 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #0055a4;">
                        <p
                            style="font-size: 16px; font-weight: 700; color: #0055a4; margin-bottom: 5px; margin: 0; padding: 0; line-height: 1.6;">
                            Order ID ${OrderData.OrderID}</p>
                        <p style="font-size: 14px; color: #666666; margin: 0; padding: 0; line-height: 1.6;">Placed on
                        ${format(new Date(OrderData.CreatedAt), "MMMM d, yyyy 'at' h:mm a")}</p>
                    </div>

                    <!-- COMPLETELY NEW DESIGN: Products Section -->
                    <div style="margin-bottom: 30px;">
                        <!-- New Minimalist Header -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 15px;">
                            <tr>
                                <td width="70%" style="vertical-align: middle;">
                                    <h2
                                        style="font-size: 20px; font-weight: 700; color: #0055a4; margin: 0; padding: 0; line-height: 1.4;">
                                        Your Items</h2>
                                </td>
                                <td width="30%" align="right" style="vertical-align: middle;">
                                    <div
                                        style="display: inline-block; background: linear-gradient(135deg, #0055a4 0%, #29abe2 100%); color: white; font-weight: 600; padding: 5px 12px; border-radius: 30px; font-size: 14px;">
                                        ${OrderData.OrderItemsID.length} items</div>
                                </td>
                            </tr>
                        </table>

                        <!-- New Horizontal Timeline Design -->
                        <div style="position: relative; margin-bottom: 20px;">
                            <div
                                style="height: 4px; background-color: #e1e8ed; width: 100%; position: relative; margin: 15px 0;">
                                <div
                                    style="height: 4px; background: linear-gradient(135deg, #0055a4 0%, #29abe2 100%); width: 100%; position: absolute; top: 0; left: 0;">
                                </div>
                            </div>
                        </div>

                       ${OrderSummary(OrderData)}

                    <!-- Shipping Info -->
                    <div
                        style="background-color: #ffffff; border-radius: 10px; padding: 20px; margin-bottom: 30px; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08); border: 1px solid #eaeef3;">
                        <h2
                            style="font-size: 18px; font-weight: 600; color: #0055a4; margin-bottom: 15px; text-align: center; margin: 0 0 15px 0; padding: 0; line-height: 1.6;">
                            Shipping Information</h2>

                        <div style="background-color: #f8fbff; border-radius: 8px; padding: 15px; margin-top: 10px;">
                            <p
                                style="font-weight: 600; color: #0055a4; margin-bottom: 5px; font-size: 14px; margin: 0 0 5px 0; padding: 0; line-height: 1.6;">
                                Shipping Address:</p>
                            <p style="color: #555555; font-size: 14px; line-height: 1.5; margin: 0; padding: 0;">
                               ${OrderData.Shipping.Address.Name}<br>
                                ${OrderData.Shipping.Address.Address},  ${OrderData.Shipping.Address.City}
                            </p>
                        </div>
                    </div>
                ${Footer()}
        </table>
    </center>
</body>

</html>`;
}
