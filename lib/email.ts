
export interface EmailPayload {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export async function sendEmail(payload: EmailPayload) {
    // In a real environment, use Resend, SendGrid, or Nodemailer here.
    // For now, we log to console as we lack credentials.
    console.log(">>> [MOCK EMAIL SENT] <<<");
    console.log("To:", payload.to);
    console.log("Subject:", payload.subject);
    console.log("Content:", payload.text);
    console.log(">>> ------------------- <<<");

    return { success: true };
}
