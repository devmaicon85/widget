import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";

export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail({
        subject,
        body,
        emailReplyTo,
        emailSendTo,
        attachments,
    }: SendMailData) {
        const transport = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE?.toString(),
            host: process.env.SMTP_HOST?.toString(),
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SSL === "false" ? false : true,
            auth: {
                user: process.env.USER_EMAIL?.toString(),
                pass: process.env.PASS_EMAIL?.toString(),
            },
        });

        await transport.sendMail({
            from: `${process.env.NAME_EMAIL} <${process.env.SMTP_FROM}>`,
            to: emailSendTo,
            cc: emailSendTo,
            replyTo: emailReplyTo,
            subject,
            html: body,
            attachments,
        });
    }
}
