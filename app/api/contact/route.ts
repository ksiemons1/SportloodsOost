import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Naam, e-mail en bericht zijn verplicht' },
        { status: 400 }
      );
    }

    // Create transporter - you'll need to configure this with your email provider
    // Option 1: Using Gmail (requires app-specific password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your-email@gmail.com
        pass: process.env.EMAIL_PASSWORD, // your app-specific password
      },
    });

    // Option 2: Using custom SMTP (recommended for business)
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST, // e.g., smtp.hostnet.nl
    //   port: parseInt(process.env.SMTP_PORT || '587'),
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });

    // Email to yourself
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'info@sportloodsoost.nl',
      subject: `Nieuw contactformulier bericht van ${name}`,
      html: `
        <h2>Nieuw bericht van het contactformulier</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefoon:</strong> ${phone}</p>` : ''}
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Auto-reply to the sender
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bedankt voor je bericht - Sportloods Oost',
      html: `
        <h2>Bedankt voor je bericht!</h2>
        <p>Hoi ${name},</p>
        <p>We hebben je bericht ontvangen en nemen zo spoedig mogelijk contact met je op.</p>
        <p>Met sportieve groet,<br>
        Team Sportloods Oost</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          <strong>Je bericht:</strong><br>
          ${message.replace(/\n/g, '<br>')}
        </p>
      `,
    });

    return NextResponse.json(
      { message: 'E-mail succesvol verzonden!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het verzenden van de e-mail' },
      { status: 500 }
    );
  }
}
