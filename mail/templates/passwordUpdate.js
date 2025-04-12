exports.passwordUpdated = (email, name) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Update Confirmation</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f9fafb;
        color: #2c3e50;
      }
  
      .container {
        max-width: 600px;
        margin: 50px auto;
        background: #ffffff;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
  
      .header {
        background: linear-gradient(135deg, #3b82f6, #60a5fa);
        padding: 30px 20px;
        text-align: center;
        color: #ffffff;
      }
  
      .header img {
        width: 60px;
        margin-bottom: 10px;
      }
  
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
  
      .content {
        padding: 30px 40px;
        text-align: center;
      }
  
      .content p {
        font-size: 16px;
        margin: 12px 0;
      }
  
      .highlight {
        font-weight: bold;
        color: #1d4ed8;
      }
  
      .security-icon {
        width: 70px;
        margin-top: 20px;
      }
  
      .footer {
        background: #f3f4f6;
        padding: 20px;
        font-size: 13px;
        text-align: center;
        color: #6b7280;
      }
  
      .footer a {
        color: #2563eb;
        text-decoration: none;
      }
  
      @media (max-width: 600px) {
        .content {
          padding: 20px;
        }
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="header">
        <img src="https://cdn-icons-png.flaticon.com/512/2889/2889676.png" alt="Security Icon" />
        <h1>Password Updated Successfully 🔐</h1>
      </div>
  
      <div class="content">
        <p>Hey <strong>${name}</strong>,</p>
        <p>Your password was successfully updated for the account linked to <span class="highlight">${email}</span>.</p>
        <p>If this wasn’t you, please contact us immediately so we can secure your account.</p>
        <img class="security-icon" src="https://cdn-icons-png.flaticon.com/512/3106/3106907.png" alt="Lock Icon" />
      </div>
  
      <div class="footer">
        Need help? Reach out to us at 
        <a href="mailto:info@studynotion.com">info@studynotion.com</a>
      </div>
    </div>
  </body>
  </html>`;
  };
  