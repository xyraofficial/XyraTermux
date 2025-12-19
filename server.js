import http from 'http';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'xyraofficialsup@gmail.com',
    pass: 'dsqo zslt oznd qlqa'
  }
});

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/send-feedback') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { fullName, email, subject, message, type, timestamp } = JSON.parse(body);

        if (!fullName || !email || !subject || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing required fields' }));
          return;
        }

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #06b6d4; margin-bottom: 20px;">New ${type.charAt(0).toUpperCase() + type.slice(1)} from Xyra Termux</h2>
            
            <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Type:</strong> ${type}</p>
              <p><strong>Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
            </div>

            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #06b6d4;">
              <h3>Message:</h3>
              <p style="white-space: pre-wrap; margin: 0;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>

            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px;">This email was sent from Xyra Termux application.</p>
          </div>
        `;

        const mailOptions = {
          from: 'Xyra Termux <xyraofficialsup@gmail.com>',
          to: 'xyraofficialsup@gmail.com',
          replyTo: email,
          subject: `[${type.toUpperCase()}] ${subject}`,
          html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Feedback sent successfully' }));
      } catch (error) {
        console.error('Error sending feedback:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to send feedback', details: error.message }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n✅ Feedback server running on http://localhost:${PORT}`);
});
