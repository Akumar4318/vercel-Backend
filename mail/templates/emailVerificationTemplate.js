const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<title>OTP Verification</title>
	<style>
	  body {
		background: linear-gradient(to right, #fdfbfb, #ebedee);
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		margin: 0;
		padding: 0;
		color: #2c3e50;
	  }
  
	  .container {
		max-width: 600px;
		margin: 50px auto;
		background: #fff;
		border-radius: 16px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		overflow: hidden;
	  }
  
	  .header {
		background: linear-gradient(135deg, #7f7fd5, #86a8e7, #91eae4);
		padding: 40px 20px;
		text-align: center;
		color: white;
		position: relative;
	  }
  
	  .header img {
		width: 70px;
		margin-bottom: 15px;
	  }
  
	  .header h1 {
		margin: 0;
		font-size: 26px;
	  }
  
	  .content {
		padding: 30px 40px;
		text-align: center;
	  }
  
	  .otp-code {
		background: #fef3c7;
		border: 2px dashed #facc15;
		display: inline-block;
		padding: 15px 30px;
		font-size: 30px;
		letter-spacing: 4px;
		font-weight: bold;
		color: #d97706;
		border-radius: 12px;
		margin: 25px 0;
	  }
  
	  .content p {
		font-size: 16px;
		margin: 12px 0;
	  }
  
	  .cta-button {
		display: inline-block;
		margin-top: 25px;
		padding: 14px 32px;
		background: linear-gradient(to right, #f7971e, #ffd200);
		color: #000;
		text-decoration: none;
		font-size: 16px;
		font-weight: bold;
		border-radius: 50px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transition: transform 0.2s;
	  }
  
	  .cta-button:hover {
		transform: scale(1.05);
	  }
  
	  .note {
		font-size: 14px;
		color: #777;
		margin-top: 20px;
	  }
  
	  .icons-row {
		margin-top: 25px;
		display: flex;
		justify-content: center;
		gap: 20px;
	  }
  
	  .icons-row img {
		width: 50px;
	  }
  
	  .footer {
		background: #f0f0f0;
		padding: 15px;
		font-size: 13px;
		color: #888;
		text-align: center;
	  }
  
	  .footer a {
		color: #007acc;
		text-decoration: none;
	  }
	</style>
  </head>
  
  <body>
	<div class="container">
	  <div class="header">
		<img src="https://cdn-icons-png.flaticon.com/512/545/545705.png" alt="Shield Icon"/>
		<h1>Verify Your Identity 🔐</h1>
	  </div>
	  <div class="content">
		<p>Hello there 👋,</p>
		<p>Your One-Time Password (OTP) is:</p>
		<div class="otp-code">${otp}</div>
		<p>This code is valid for <strong>5 minutes</strong>.</p>
		<a href="https://studynotion-edtech-project.vercel.app" class="cta-button">Verify Now</a>
		<p class="note">If you did not request this, please ignore this email.</p>
  
		<div class="icons-row">
		  <img src="https://cdn-icons-png.flaticon.com/512/484/484662.png" alt="Lock Icon"/>
		  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png" alt="User Icon"/>
		  <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Check Icon"/>
		</div>
	  </div>
	  <div class="footer">
		Need help? Contact us at
		<a href="mailto:info@studynotion.com">info@studynotion.com</a>
	  </div>
	</div>
  </body>
  </html>`;
  };
  
  module.exports = otpTemplate;
  