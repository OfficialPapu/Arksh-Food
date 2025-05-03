const OrderSummary = (OrderData) => {
    return (`
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                            style="border-collapse: separate; border-spacing: 0 15px;">
                         ${OrderData.OrderItemsID.map(element => `
        <tr>
            <td style="padding: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden; border: 1px solid #e1e8ed;">
                    <tr>
                        <td width="6"
                            style="background: linear-gradient(to bottom, #0055a4, #29abe2); padding: 0;">
                            &nbsp;</td>

                        <td style="padding: 15px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding-right: 15px;">
                                        <table width="100%" cellpadding="0" cellspacing="0"
                                            border="0">
                                            <tr>
                                                <td>
                                                    <h3 style="font-size: 16px; font-weight: 600; color: #0055a4; margin: 0 0 5px 0; padding: 0; line-height: 1.4;">
                                                    ${element.ProductID.Name.length > 50 ? element.ProductID.Name.slice(0, 50) + "..." : element.ProductID.Name}
                                                </h3>


                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" cellpadding="0"
                                                        cellspacing="0" border="0">
                                                        <tr>
                                                            <td width="50%"
                                                                style="vertical-align: middle;">
                                                                <span
                                                                    style="display: inline-block; background-color: #f0f7ff; color: #0055a4; font-weight: 600; padding: 3px 10px; border-radius: 4px; font-size: 12px;">Qty:
                                                                    ${element.Quantity}</span>
                                                            </td>

                                                             ${element.UnitPrice != element.BasePrice
            ? `<td width="50%" align="right" style="vertical-align: middle;">
                                                            <span style="display: block; text-decoration: line-through; color: #999999; font-size: 12px;">Rs. ${element.BasePrice.toFixed(2)}</span>
                                                            <span style="display: block; color: #00c951; font-weight: 700; font-size: 16px;">Rs. ${element.UnitPrice.toFixed(2)}</span>
                                                        </td>`
            : `<td width="50%" align="right" style="vertical-align: middle;">
                                                            <span style="display: block; color: #0055a4; font-weight: 700; font-size: 16px;">Rs. ${element.UnitPrice.toFixed(2)}</span>
                                                        </td>`
        }

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
            </td>
        </tr>
  `).join("")}            

                        </table>

                    </div>

                    <div
                        style="background-color: #ffffff; border-radius: 10px; padding: 20px; margin-bottom: 30px; box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08); border: 1px solid #eaeef3;">
                        <h2
                            style="font-size: 18px; font-weight: 600; color: #0055a4; margin-bottom: 15px; text-align: center; margin: 0 0 15px 0; padding: 0; line-height: 1.6;">
                            Order Summary</h2>

                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            
                               <tr>
                                <td style="padding: 10px 0; border-bottom: 1px dashed #eaeef3;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="color: #666666; font-size: 14px;">Pickup</td>
                                            <td align="right"
                                                style="font-weight: 600; color: #333333; font-size: 14px;">${OrderData.Shipping.Method}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                         <tr>
                                <td style="padding: 10px 0; border-bottom: 1px dashed #eaeef3;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="color: #666666; font-size: 14px;">Method</td>
                                            <td align="right"
                                                style="font-weight: 600; color: #333333; font-size: 14px;">${OrderData.Payment.Method}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px dashed #eaeef3;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="color: #666666; font-size: 14px;">Subtotal</td>
                                            <td align="right"
                                                style="font-weight: 600; color: #333333; font-size: 14px;">Rs. ${OrderData.BaseTotal.toFixed(2)}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            ${OrderData.Discount ? `
                                <tr>
                                    <td style="padding: 10px 0; border-bottom: 1px dashed #eaeef3;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                                <td style="color: #666666; font-size: 14px;">Discount</td>
                                                <td align="right"
                                                    style="font-weight: 600; color: #00c951; font-size: 14px;">-Rs. ${OrderData.Discount.toFixed(2)}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            ` : ``}
                            

                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px dashed #eaeef3;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="color: #666666; font-size: 14px;">Shipping</td>
                                            <td align="right"
                                                style="font-weight: 600; color: #333333; font-size: 14px;">${OrderData.Shipping.Cost == 0 ? `Free` : `Rs. ${OrderData.Shipping.Cost.toFixed(2)}`}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 15px 0 5px; margin-top: 10px;">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="font-size: 18px; font-weight: 700; color: #0055a4;">Total</td>
                                            <td align="right"
                                                 style="font-size: 18px; font-weight: 700; color: #0055a4;">Rs. ${OrderData.GrandTotal.toFixed(2)}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>`)
}

export default OrderSummary
