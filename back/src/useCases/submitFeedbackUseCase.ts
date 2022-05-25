import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";
import fs from "node:fs";
import path from "node:path";
import Handlebars from "handlebars";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
    emailReplyTo?: string;
    emailSendTo?: string;
    title?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedBacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot, emailReplyTo, emailSendTo, title } =
            request;

        if (!type) {
            throw new Error("type is required");
        }

        if (!comment) {
            throw new Error("comment is required");
        }

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("invalid screenshot format");
        }

        const newFeedback = await this.feedBacksRepository
            .create({
                type,
                comment,
                screenshot,
                emailReplyTo,
                emailSendTo,
            })
            .catch((error) => {
                throw new Error(`error create feed back: ${error}`);
            });

        try {
            // template do email HTML em views/sendEmail.html
            const templateEmail = Handlebars.compile(
                fs.readFileSync(
                    path.join(__dirname, "../views/sendEmail.html"),
                    "utf8"
                )
            );

            const emailSender =
                emailReplyTo?.trim() !== ""
                    ? emailReplyTo
                    : "remetente não deixou contato";

            const htmlToSend = templateEmail({
                title,
                type,
                comment,
                email: emailSender,
                screenshot,
            });

            await this.mailAdapter.sendMail({
                subject: `Nova mensagem em ${title} - ${type}`,
                body: htmlToSend,
                emailReplyTo,
                emailSendTo,
                attachments: [
                    {
                        path: screenshot,
                        filename: "screenshot.png",
                        contentType: "image/png",
                    },
                ],
            });

            console.log("Email enviado com sucesso!");
        } catch (error) {
            throw new Error(`error send e-mail feed back: ${error}`);
        }

        return newFeedback;
    }
}
