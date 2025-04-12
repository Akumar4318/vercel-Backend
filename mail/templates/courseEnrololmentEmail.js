exports.courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Welcome to Your Course</title>
    <style>
      body {
        background: linear-gradient(to right, #f0f8ff, #ffffff);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0;
        padding: 0;
        color: #2c3e50;
      }
  
      .container {
        max-width: 700px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
  
      .header {
        background: linear-gradient(to right, #06beb6, #48b1bf);
        padding: 30px;
        text-align: center;
        color: white;
      }
  
      .header img {
        max-width: 80px;
        margin-bottom: 10px;
      }
  
      .header h1 {
        margin: 0;
        font-size: 26px;
      }
  
      .main {
        padding: 30px 40px;
        text-align: center;
      }
  
      .main p {
        font-size: 17px;
        margin: 15px 0;
      }
  
      .highlight {
        font-weight: bold;
        color: #2d98da;
      }
  
      .img-row {
        margin-top: 25px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
      }
  
      .img-row img {
        width: 100px;
        border-radius: 8px;
      }
  
      .cta {
        display: inline-block;
        padding: 14px 30px;
        background-color: #ffcc00;
        color: #000;
        border-radius: 8px;
        font-weight: bold;
        text-decoration: none;
        margin-top: 30px;
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
        color: #06beb6;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
  
    <div class="container">
      <div class="header">
        <img src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png" alt="Course Icon" />
        <h1>Welcome to the Course! 🎓</h1>
      </div>
  
      <div class="main">
        <p>Hi <strong>${name}</strong>,</p>
        <p>You’ve successfully enrolled in <span class="highlight">"${courseName}"</span>! 📘</p>
        <p>We’re thrilled to have you on board. Get ready to learn, grow, and achieve your goals.</p>
  
        <div class="img-row">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" alt="Student Icon" />
          <img src="https://cdn-icons-png.flaticon.com/512/2857/2857391.png" alt="Books Icon" />
          <img src="https://cdn-icons-png.flaticon.com/512/4221/4221419.png" alt="Rocket Icon" />
        </div>
  
        <p>🧠 Start exploring your course content and unlock new skills.</p>
        <a class="cta" href="https://studynotion-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
      </div>
  
      <div class="footer">
        Need help? Email us at
        <a href="mailto:info@studynotion.com">info@studynotion.com</a><br />
        &copy; ${new Date().getFullYear()} StudyNotion. All rights reserved.
      </div>
    </div>
  
  </body>
  </html>`;
  };
  