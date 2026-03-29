import nodemailer from 'nodemailer';

// TO THE USER: To make this work in production, you must set these 
// environment variables in your deployment platform (e.g. Vercel) 
// or in a local .env.local file.
const GMAIL_USER = process.env.GMAIL_USER || 'usalimous3@gmail.com'; 
const GMAIL_PASS = process.env.GMAIL_PASS || ''; // Gmail App Password

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

export const getBookingEmailTemplate = (data: any) => {
  return `
    <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0F1419; color: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #D4AF37;">
      <div style="background-color: #D4AF37; padding: 40px; text-align: center;">
        <h1 style="margin: 0; font-family: 'Playfair Display', serif; color: #0F1419; font-size: 32px; letter-spacing: 2px;">USA LIMOS</h1>
        <p style="margin: 10px 0 0; color: #0F1419; text-transform: uppercase; font-weight: bold; font-size: 12px; letter-spacing: 4px;">Premium Notification</p>
      </div>
      
      <div style="padding: 40px;">
        <h2 style="font-family: 'Playfair Display', serif; color: #D4AF37; border-bottom: 1px solid #2A2A2A; padding-bottom: 15px; margin-bottom: 25px;">New Booking Request</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold; width: 140px;">Customer</td>
            <td style="padding: 10px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold;">Phone</td>
            <td style="padding: 10px 0;">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold;">Email</td>
            <td style="padding: 10px 0;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 20px 0;" colspan="2"><hr style="border: none; border-top: 1px solid #2A2A2A;" /></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold;">Service</td>
            <td style="padding: 10px 0; text-transform: capitalize;">${data.tripType.replace(/([A-Z])/g, ' $1')}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold;">Vehicle</td>
            <td style="padding: 10px 0;">${data.vehicleName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold;">Date & Time</td>
            <td style="padding: 10px 0;">${data.date} at ${data.time}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold;">Pickup</td>
            <td style="padding: 10px 0;">${data.pickup}</td>
          </tr>
          ${data.dropoff ? `
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold;">Drop-off</td>
            <td style="padding: 10px 0;">${data.dropoff}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #D4AF37; font-weight: bold;">Passengers</td>
            <td style="padding: 10px 0;">${data.passengers} PAX</td>
          </tr>
        </table>
        
        <div style="margin-top: 30px; background-color: #161b22; padding: 25px; border-radius: 12px; border: 1px dashed #D4AF37;">
          <p style="margin: 0; color: #D4AF37; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Estimated Price</p>
          <p style="margin: 10px 0 0; font-size: 36px; font-weight: bold;">$${data.estimatedPrice}</p>
        </div>
        
        ${data.requests ? `
        <div style="margin-top: 30px;">
          <p style="color: #D4AF37; font-weight: bold; margin-bottom: 10px;">Special Requests:</p>
          <div style="padding: 15px; background-color: #1A1A1A; border-radius: 8px; font-style: italic;">
            ${data.requests}
          </div>
        </div>` : ''}
      </div>
      
      <div style="background-color: #1A1A1A; padding: 20px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; 2026 USA LIMOS SERVICE. All rights reserved.</p>
      </div>
    </div>
  `;
};

export const getContactEmailTemplate = (data: any) => {
  return `
    <div style="font-family: 'DM Sans', sans-serif; max-width: 600px; margin: 0 auto; background-color: #0F1419; color: #FFFFFF; border-radius: 20px; overflow: hidden; border: 1px solid #D4AF37;">
      <div style="background-color: #D4AF37; padding: 40px; text-align: center;">
        <h1 style="margin: 0; font-family: 'Playfair Display', serif; color: #0F1419; font-size: 32px; letter-spacing: 2px;">USA LIMOS</h1>
      </div>
      
      <div style="padding: 40px;">
        <h2 style="font-family: 'Playfair Display', serif; color: #D4AF37; border-bottom: 1px solid #2A2A2A; padding-bottom: 15px; margin-bottom: 25px;">New Contact Message</h2>
        
        <p><strong>From:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${data.subject}</p>
        
        <div style="margin-top: 30px; padding: 25px; background-color: #1A1A1A; border-radius: 12px; border-left: 4px solid #D4AF37;">
          <p style="margin: 0; line-height: 1.6;">${data.message}</p>
        </div>
      </div>
    </div>
  `;
};
