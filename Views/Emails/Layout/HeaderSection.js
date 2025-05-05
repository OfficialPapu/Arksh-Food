export const IntorSection = (OrderData) => {
  return ` <tr>
                <td align="center"
                    style="background: linear-gradient(135deg, #0055a4 0%, #29abe2 100%); text-align: center; padding: 30px 20px 20px; border-bottom: 1px solid #eaeef3;">
                    <h1
                        style="font-size: 28px; font-weight: 700; color: #ffffff; margin-bottom: 10px; margin: 0; padding: 0; line-height: 1.6;">
                        ${OrderData.Email.Title}</h1>
                    <p style="font-size: 16px; color: #fff; font-weight: 500; margin: 0; padding: 0; line-height: 1.6;">${OrderData.Email.Subtitle}</p>
                </td>
            </tr>`;
};

export const GreetingSection = (OrderData) => {
  const isAdmin = OrderData?.Email?.isAdminNotification;
  return `<div style="font-size: 18px; color: #444444; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px dashed #eaeef3;">
                        Hello <span style="color: #0055a4; font-weight: 600;">${isAdmin ? "Arksh Food" : OrderData.UserID.Name}</span>,
                        <p style="margin-top: 10px; margin: 0; padding: 0; line-height: 1.6;">${OrderData.Email.Description}</p>
                    </div>`;
};
