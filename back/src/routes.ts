import { Router } from "express";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodeMailerMailAdapter";
import { prisma } from "./prisma";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedbackUseCase } from "./useCases/submitFeedbackUseCase";

export const routes = Router();

routes.get("/", (req, res) => {
    return res.json({ api: true });
});

// routes.get("/feedbacks", async (req, res) => {
//     const feedbacks = await prisma.feedback.findMany();
//     return res.json({ feedbacks });
// });
routes.post("/feedbacks", async (req, res) => {
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
        return res.status(500).send();
    }
});
