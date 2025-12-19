import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { fullName, email, subject, message, type, timestamp } = req.body;

    // Validate required fields
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    });

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
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[${type.toUpperCase()}] ${subject}`,
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Feedback sent: ${fullName} - ${subject}`);

    return res.status(200).json({ success: true, message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('❌ Error sending feedback:', error.message);
    return res.status(500).json({ error: 'Failed to send feedback', details: error.message });
  }
}
