import { NodeMailerMailAdapter } from "backend/adapters/nodemailer/nodeMailerMailAdapter";
import { PrismaFeedbacksRepository } from "backend/repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "backend/useCases/submitFeedbackUseCase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function feedbacks(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { type, comment, screenshot, emailReplyTo, emailSendTo, title } =
            req.body;

        const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
        const nodeMailerMailAdapter = new NodeMailerMailAdapter();

        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbacksRepository,
            nodeMailerMailAdapter
        );

        const newFeedback = await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot,
            title,
            emailReplyTo,
            emailSendTo,
        });

        return res.status(201).json(newFeedback);
    } catch (error) {
        console.error("error:", error);
        return res.status(500).send({ error });
    }
}
