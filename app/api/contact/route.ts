import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, company, email, phone, platform, message } = body

    // Validate required fields
    if (!name || !company || !email || !message) {
      return NextResponse.json(
        { error: "Name, company, email and message are required." },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:4px;overflow:hidden;">
                <!-- Header -->
                <tr>
                  <td style="background:#1e2044;padding:24px 32px;border-bottom:3px solid #d4a843;">
                    <h1 style="margin:0;font-size:20px;color:#ffffff;font-weight:700;">VizionForge</h1>
                    <p style="margin:4px 0 0;font-size:12px;color:#d4a843;text-transform:uppercase;letter-spacing:2px;">New Contact Enquiry</p>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding:32px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;font-size:13px;color:#71717a;width:120px;vertical-align:top;">Name</td>
                        <td style="padding:8px 0;font-size:14px;color:#1e2044;font-weight:600;">${escapeHtml(name)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:13px;color:#71717a;vertical-align:top;">Company</td>
                        <td style="padding:8px 0;font-size:14px;color:#1e2044;font-weight:600;">${escapeHtml(company)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:13px;color:#71717a;vertical-align:top;">Email</td>
                        <td style="padding:8px 0;font-size:14px;color:#1e2044;font-weight:600;">
                          <a href="mailto:${escapeHtml(email)}" style="color:#d4a843;">${escapeHtml(email)}</a>
                        </td>
                      </tr>
                      ${phone ? `
                      <tr>
                        <td style="padding:8px 0;font-size:13px;color:#71717a;vertical-align:top;">Phone</td>
                        <td style="padding:8px 0;font-size:14px;color:#1e2044;font-weight:600;">${escapeHtml(phone)}</td>
                      </tr>` : ""}
                      ${platform ? `
                      <tr>
                        <td style="padding:8px 0;font-size:13px;color:#71717a;vertical-align:top;">Platform</td>
                        <td style="padding:8px 0;font-size:14px;color:#1e2044;font-weight:600;">${escapeHtml(platform)}</td>
                      </tr>` : ""}
                      <tr>
                        <td colspan="2" style="padding:16px 0 8px;">
                          <div style="border-top:1px solid #e4e4e7;"></div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-size:13px;color:#71717a;vertical-align:top;">Message</td>
                        <td style="padding:8px 0;font-size:14px;color:#1e2044;line-height:1.6;">${escapeHtml(message)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background:#1e2044;padding:16px 32px;text-align:center;">
                    <p style="margin:0;font-size:11px;color:#71717a;">
                      This email was sent from the VizionForge website contact form.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@vizionforge.com",
      to: "harpreet@vizionforge.com",
      replyTo: email,
      subject: `New Enquiry from ${name} — ${company}`,
      html: htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
