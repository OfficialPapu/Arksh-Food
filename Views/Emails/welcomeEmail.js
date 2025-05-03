export default function orderConfirmationTemplate() {
    const name="pap";
    const orderId=100;
     return `
      <div style="font-family: Arial, sans-serif;">
        <h2>Thank you for your order, ${name}!</h2>
        <p>Your Order ID: <strong>${orderId}</strong></p>
  
        <table border="1" cellpadding="5" cellspacing="0" style="margin-top: 10px;">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
        </table>
  
        <p style="margin-top: 10px;"><strong>Total:</strong> $${1000}</p>
        <p>We will notify you once your order ships. 😊</p>
      </div>
    `;
  }
  