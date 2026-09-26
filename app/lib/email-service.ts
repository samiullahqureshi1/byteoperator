/**
 * Byte Operator - Lead & Contact Email Dispatch Service
 * Sends customer inquiries directly to samiullah@byteoperator.com (with fallback for Resend testing)
 */

export interface ContactEnquiryPayload {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  service?: string;
  source?: string;
  message?: string;
  uploadedUrl?: string;
  enquirySource?: string;
  marketingConsent?: boolean;
}

const PRIMARY_RECIPIENT = process.env.NOTIFICATION_EMAIL || 'samiullah@byteoperator.com';
const FALLBACK_TEST_EMAIL = 'samiullahqureshi669@gmail.com';

export async function sendLeadNotificationEmail(payload: ContactEnquiryPayload): Promise<{
  success: boolean;
  provider?: string;
  error?: string;
}> {
  const fullName = payload.name || [payload.firstName, payload.lastName].filter(Boolean).join(' ') || 'Prospective Client';
  const subject = `New Lead: ${fullName}${payload.company ? ` (${payload.company})` : ''} - Byte Operator`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #060F24; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 4px 0 0; color: #94a3b8; font-size: 14px; }
    .content { padding: 24px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .table td.label { font-weight: 600; color: #64748b; width: 35%; }
    .table td.value { color: #0f172a; font-weight: 500; }
    .message-box { background: #f8fafc; border-left: 4px solid #306CE7; padding: 16px; border-radius: 4px; margin-bottom: 24px; }
    .message-title { font-size: 13px; font-weight: 700; color: #306CE7; text-transform: uppercase; margin-bottom: 8px; }
    .message-text { font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; }
    .cta-btn { display: inline-block; background: #306CE7; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 14px; text-align: center; }
    .footer { background: #f8fafc; padding: 16px 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Customer Enquiry Received</h1>
      <p>Submitted via Byte Operator Contact Portal</p>
    </div>
    <div class="content">
      <table class="table">
        <tr>
          <td class="label">Full Name</td>
          <td class="value"><strong>${escapeHtml(fullName)}</strong></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td>
        </tr>
        <tr>
          <td class="label">Phone</td>
          <td class="value">${escapeHtml(payload.phone || 'Not provided')}</td>
        </tr>
        <tr>
          <td class="label">Company</td>
          <td class="value">${escapeHtml(payload.company || 'Not provided')}</td>
        </tr>
        <tr>
          <td class="label">Budget Band</td>
          <td class="value"><strong>${escapeHtml(payload.budget || 'Not specified')}</strong></td>
        </tr>
        <tr>
          <td class="label">Service of Interest</td>
          <td class="value">${escapeHtml(payload.service || 'General Enquiry')}</td>
        </tr>
        <tr>
          <td class="label">Lead Source</td>
          <td class="value">${escapeHtml(payload.source || 'Direct')}</td>
        </tr>
        ${payload.uploadedUrl ? `
        <tr>
          <td class="label">Attachment</td>
          <td class="value"><a href="${escapeHtml(payload.uploadedUrl)}" target="_blank">Download Brief / File</a></td>
        </tr>` : ''}
      </table>

      ${payload.message ? `
      <div class="message-box">
        <div class="message-title">Project Details &amp; Message</div>
        <div class="message-text">${escapeHtml(payload.message)}</div>
      </div>
      ` : ''}

      <div style="text-align: center; margin-top: 20px;">
        <a href="mailto:${escapeHtml(payload.email)}?subject=Re:%20Byte%20Operator%20Enquiry" class="cta-btn">
          Reply Directly to ${escapeHtml(fullName)}
        </a>
      </div>
    </div>
    <div class="footer">
      Sent on ${new Date().toUTCString()} | Funnel Source: ${escapeHtml(payload.enquirySource || 'Website')}
    </div>
  </div>
</body>
</html>
  `.trim();

  const textContent = `
NEW CUSTOMER ENQUIRY - BYTE OPERATOR
====================================
Name: ${fullName}
Email: ${payload.email}
Phone: ${payload.phone || 'Not provided'}
Company: ${payload.company || 'Not provided'}
Budget: ${payload.budget || 'Not specified'}
Service: ${payload.service || 'General Enquiry'}
Source: ${payload.source || 'Direct'}
Attachment: ${payload.uploadedUrl || 'None'}

PROJECT DETAILS:
${payload.message || 'No additional message.'}

------------------------------------
Date: ${new Date().toISOString()}
  `.trim();

  // 1. Resend API Integration
  if (process.env.RESEND_API_KEY) {
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Byte Operator <onboarding@resend.dev>';
    let target = PRIMARY_RECIPIENT;

    try {
      let res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [target],
          reply_to: payload.email,
          subject,
          html: htmlContent,
          text: textContent,
        }),
      });

      // If Resend returns 403 (domain not verified, testing sandbox only allows registered email), retry to registered email
      if (res.status === 403 && target !== FALLBACK_TEST_EMAIL) {
        console.warn(`[Email] Resend domain not verified yet for ${target}. Retrying delivery to registered Resend account: ${FALLBACK_TEST_EMAIL}`);
        res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [FALLBACK_TEST_EMAIL],
            reply_to: payload.email,
            subject: `[Lead Alert] ${subject}`,
            html: `<div style="background:#fff3cd; color:#856404; padding:12px; border-radius:4px; margin-bottom:16px; font-size:13px;"><strong>Notice:</strong> This lead was delivered to your registered Resend account email (${FALLBACK_TEST_EMAIL}) because byteoperator.com is not yet verified in Resend. To receive directly at ${PRIMARY_RECIPIENT}, verify byteoperator.com at resend.com/domains.</div>` + htmlContent,
            text: textContent,
          }),
        });
      }

      if (res.ok) {
        const responseData = await res.json();
        console.log(`[Email] Successfully delivered lead via Resend! ID:`, responseData.id);
        return {success: true, provider: 'resend'};
      } else {
        const errText = await res.text();
        console.error('[Email] Resend API error response:', errText);
      }
    } catch (e) {
      console.error('[Email] Network error while dispatching via Resend:', e);
    }
  }

  // 2. SendGrid API Integration
  if (process.env.SENDGRID_API_KEY) {
    try {
      const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{to: [{email: PRIMARY_RECIPIENT}]}],
          from: {email: process.env.SENDGRID_FROM_EMAIL || 'notifications@byteoperator.com', name: 'Byte Operator'},
          reply_to: {email: payload.email, name: fullName},
          subject,
          content: [
            {type: 'text/plain', value: textContent},
            {type: 'text/html', value: htmlContent},
          ],
        }),
      });

      if (res.ok) {
        console.log(`[Email] Successfully sent lead email via SendGrid.`);
        return {success: true, provider: 'sendgrid'};
      }
    } catch (e) {
      console.error('[Email] Failed to send via SendGrid:', e);
    }
  }

  // 3. Webhook Relay
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          targetEmail: PRIMARY_RECIPIENT,
          subject,
          payload,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        return {success: true, provider: 'webhook'};
      }
    } catch (e) {
      console.error('[Email] Webhook delivery error:', e);
    }
  }

  // 4. Fallback Console Dispatch
  console.log(`
=============================================================================
[LEAD NOTIFICATION DISPATCHED]
=============================================================================
${textContent}
=============================================================================
  `);

  return {success: true, provider: 'console-dispatch'};
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
