import { decryptPassword } from "@/lib/BaseConfig";

export default function ForgotPassword(OrderData) {
    OrderData.Password = decryptPassword(OrderData.Password);
    return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Recovery - ARKSH Food</title>
    <style type="text/css">
        /* Client-specific styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        
        /* Responsive styles */
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .responsive-padding {
                padding-left: 15px !important;
                padding-right: 15px !important;
            }
            .responsive-padding-sm {
                padding-left: 10px !important;
                padding-right: 10px !important;
            }
            .responsive-header-padding {
                padding: 25px 15px 20px 15px !important;
            }
            .responsive-content-padding {
                padding: 20px 15px !important;
            }
            .responsive-button {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
            }
            .responsive-button a {
                width: 100% !important;
                max-width: 100% !important;
                font-size: 14px !important;
                line-height: 45px !important;
            }
            .responsive-title {
                font-size: 24px !important;
                line-height: 30px !important;
            }
            .responsive-subtitle {
                font-size: 14px !important;
                line-height: 20px !important;
            }
            .responsive-text {
                font-size: 14px !important;
                line-height: 20px !important;
            }
            .responsive-password {
                font-size: 22px !important;
                line-height: 28px !important;
            }
            .responsive-top-padding {
                padding-top: 20px !important;
            }
            .responsive-bottom-padding {
                padding-bottom: 20px !important;
            }
        }
        
        /* Additional mobile optimizations */
        @media screen and (max-width: 400px) {
            .responsive-title {
                font-size: 22px !important;
                line-height: 28px !important;
            }
            .responsive-subtitle {
                font-size: 13px !important;
                line-height: 19px !important;
            }
            .responsive-text {
                font-size: 13px !important;
                line-height: 19px !important;
            }
            .responsive-password {
                font-size: 20px !important;
                line-height: 26px !important;
                letter-spacing: 1px !important;
            }
            .responsive-button a {
                font-size: 13px !important;
                line-height: 40px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', 'SF Pro Display', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <!-- MAIN WRAPPER -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="min-width: 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
        <tr>
            <td align="center" valign="top" class="responsive-wrapper-padding">
                <!-- EMAIL CONTAINER -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width: 650px; margin: 0 auto; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tr>
                        <td align="center" valign="top">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 16px; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); overflow: hidden;">
                                <tr>
                                    <td align="center" valign="top" style="background: linear-gradient(to right, #0055a4, #0077cc, #00a1e0); height: 6px; line-height: 6px; font-size: 0;">&nbsp;</td>
                                </tr>
                                
                                <tr>
                                    <td align="center" valign="top" class="responsive-header-padding" style="padding: 40px 40px 30px 40px;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td align="center" valign="top">
                                                    <h1 class="responsive-title" style="color: #0055a4; margin: 0; font-size: 32px; line-height: 40px; font-weight: 700; letter-spacing: 0.5px;">Password Recovery</h1>
                                                    <p class="responsive-subtitle" style="color: #5a6a7e; margin: 12px auto 0 auto; font-size: 16px; line-height: 24px; font-weight: 400; letter-spacing: 0.2px; max-width: 450px;">Your account password has been recovered and is ready for you</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td align="center" valign="top" class="responsive-padding" style="padding: 0 40px 30px 40px;">
                                        <table width="70px" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td align="center" style="height: 3px; background: linear-gradient(to right, transparent, #0077cc, transparent);"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="left" valign="top" class="responsive-padding responsive-bottom-padding" style="padding: 0 40px 25px 40px;">
                                        <p class="responsive-text" style="font-size: 16px; line-height: 24px; margin: 0; color: #2d3748; font-weight: 400;">Dear <strong style="font-weight: 600; color: #1a202c;">${OrderData.Name}</strong>,</p>
                                        <p class="responsive-text" style="font-size: 16px; line-height: 24px; margin: 15px 0 0 0; color: #2d3748; font-weight: 400;">We received a request to recover your password for your ARKSH Food account. As requested, here is your account password:</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="left" valign="top" class="responsive-padding responsive-bottom-padding" style="padding: 0 40px 30px 40px;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                            <tr>
                                                <td style="background-color: #f8faff; border-radius: 14px; padding: 0; box-shadow: 0 6px 15px rgba(0, 85, 164, 0.08);">
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="responsive-padding-sm" style="background: linear-gradient(to right, #0055a4, #0077cc); padding: 15px 25px; border-radius: 14px 14px 0 0;">
                                                                <p style="margin: 0; font-size: 15px; line-height: 18px; color: #ffffff; font-weight: 500;">Your Password</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="responsive-content-padding" style="padding: 25px;">
                                                                <p class="responsive-password" style="margin: 0; font-size: 28px; line-height: 34px; font-weight: 700; color: #0055a4; letter-spacing: 1.5px; font-family: 'Segoe UI', 'SF Pro Display', Helvetica, Arial, sans-serif; text-align: center;">${OrderData.Password}</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="left" valign="top" class="responsive-padding responsive-bottom-padding" style="padding: 0 40px 30px 40px;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8faff; border-radius: 14px;">
                                            <tr>
                                                <td class="responsive-content-padding" style="padding: 25px;">
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td style="padding-bottom: 15px;">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td width="20" valign="top">
                                                                            <table width="6" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                <tr>
                                                                                    <td style="background-color: #0077cc; width: 6px; height: 6px; border-radius: 50%; line-height: 0; font-size: 0;">&nbsp;</td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                        <td style="padding-left: 8px;">
                                                                            <p class="responsive-text" style="font-size: 15px; line-height: 22px; margin: 0; color: #4a5568; font-weight: 400;">
                                                                                For security reasons, we recommend changing your password after logging in.
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td width="20" valign="top">
                                                                            <table width="6" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                <tr>
                                                                                    <td style="background-color: #0077cc; width: 6px; height: 6px; border-radius: 50%; line-height: 0; font-size: 0;">&nbsp;</td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                        <td style="padding-left: 8px;">
                                                                            <p class="responsive-text" style="font-size: 15px; line-height: 22px; margin: 0; color: #4a5568; font-weight: 400;">
                                                                                If you did not request this password recovery, please contact our customer support immediately.
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- BUTTON -->
                                <tr>
                                    <td align="center" valign="top" class="responsive-padding responsive-bottom-padding" style="padding: 0 40px 40px 40px;">
                                        <table cellpadding="0" cellspacing="0" border="0" class="responsive-button" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 250px;">
                                            <tr>
                                                <td align="center" style="background: linear-gradient(to right, #0055a4, #0077cc); border-radius: 40px; box-shadow: 0 6px 15px rgba(0, 85, 164, 0.2);">
                                                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/login" style="background: linear-gradient(to right, #0055a4, #0077cc); border-radius: 40px; color: #ffffff; display: inline-block; font-family: 'Segoe UI', 'SF Pro Display', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 48px; text-align: center; text-decoration: none; width: 250px; -webkit-text-size-adjust: none; box-shadow: 0 6px 15px rgba(0, 85, 164, 0.2);">Login to Your Account</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `
}
