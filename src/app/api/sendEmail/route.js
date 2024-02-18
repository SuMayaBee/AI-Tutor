import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try{
    const {subject, message} = await request.json();

    const transporter = nodemailer.createTransport({
        service: "zoho",
        host:"smtpro.zoho.in",
        port: 465,
        secure: true,
        auth: {
            user: "alissaedward82@gmail,com",
            pass: process.env.NEXT_PUBLIC_PASSWORD
        }
    })

    const mailOptions = {
        from: "alissaedward82@gmail.com",
        to: "bsse1446@iit.du.ac.bd",
       // subject: "Remarks",
        html: `
            <h1>${subject}</h1>
            <p>${message}</p>
        `
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({message: "Email sent successfully"}, {status: 200})
} catch (error) {
    return NextResponse.json({message: "Email not sent"}, {status: 500})
}
}