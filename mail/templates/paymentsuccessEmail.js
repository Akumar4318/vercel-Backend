exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Payment Confirmation</title>
    <style>
      body {
        background: linear-gradient(to right, #f0f4ff, #ffffff);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        color: #2c3e50;
      }
  
      .container {
        max-width: 700px;
        margin: 40px auto;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
  
      .header {
        background: linear-gradient(to right, #667eea, #764ba2);
        padding: 30px;
        text-align: center;
        color: white;
      }
  
      .header img {
        max-width: 80px;
        margin-bottom: 10px;
      }
  
      .header h1 {
        margin: 10px 0 0;
        font-size: 26px;
      }
  
      .main {
        padding: 30px 40px;
        text-align: center;
      }
  
      .main img {
        max-width: 100px;
        margin: 20px 0;
      }
  
      .main p {
        font-size: 17px;
        margin: 10px 0;
      }
  
      .highlight {
        font-weight: bold;
        color: #27ae60;
      }
  
      .section {
        margin: 30px 0;
      }
  
      .cta {
        display: inline-block;
        padding: 14px 30px;
        margin-top: 25px;
        background-color: #ffcc00;
        color: #000;
        border-radius: 8px;
        font-weight: bold;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
  
      .cta:hover {
        background-color: #e6b800;
      }
  
      .footer {
        background: #f9f9f9;
        padding: 20px;
        text-align: center;
        font-size: 14px;
        color: #888;
      }
  
      .footer a {
        color: #667eea;
        text-decoration: none;
      }
  
      .img-group {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
        margin-top: 20px;
      }
  
      .img-group img {
        max-width: 100px;
        border-radius: 8px;
      }
    </style>
  </head>
  <body>
  
    <div class="container">
      <div class="header">
        <img src="https://cdn-icons-png.flaticon.com/512/9068/9068753.png" alt="Success Icon" />
        <h1>Payment Successful 🎉</h1>
      </div>
  
      <div class="main">
        <p>Hi <strong>${name}</strong>,</p>
        <p>We have received your payment of <span class="highlight">₹${amount}</span>.</p>
        <p>🆔 Payment ID: <b>${paymentId}</b></p>
        <p>📦 Order ID: <b>${orderId}</b></p>
        <img src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png" alt="Credit Card Success" />
  
        <div class="section">
          <h2>What’s Next?</h2>
          <p>✅ Your access to the course is now activated.</p>
          <p>🚀 Start learning and leveling up your skills!</p>
          <a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
        </div>
  
        <div class="img-group">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Student" />
          <img src="https://cdn-icons-png.flaticon.com/512/2857/2857391.png" alt="Learning" />
          <img src="https://cdn-icons-png.flaticon.com/512/4221/4221419.png" alt="Rocket" />
        </div>
  
        <div class="section">
          <h3>Need Help?</h3>
          <p>We're here for you anytime. Just email us at</p>
          <p><a href="mailto:info@studynotion.com">info@studynotion.com</a></p>
        </div>
      </div>
  
      <div class="footer">
        &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
      </div>
    </div>
  
  </body>
  </html>`;
  };
  