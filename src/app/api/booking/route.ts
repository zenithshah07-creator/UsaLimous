import { NextResponse } from 'next/server';
import { transporter, getBookingEmailTemplate } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 1. Send Email Notification to Owner
    const mailOptions = {
      from: process.env.GMAIL_USER || 'usalimous3@gmail.com',
      to: 'usalimous3@gmail.com',
      subject: `✦ NEW BOOKING: ${data.name} ✦`,
      html: getBookingEmailTemplate(data),
    };

    // Note: This will only work if GMAIL_PASS is set in .env.local
    if (process.env.GMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn("Skipping email send: GMAIL_PASS not found in environment variables.");
    }

    return NextResponse.json({ success: true, message: 'Booking recorded successfully' }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to process booking' }, { status: 500 });
  }
}
