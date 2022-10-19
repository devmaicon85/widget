import prismaClient from "lib/prismaClient";
import {
    FeedbackCreateData,
    FeedbacksRepository,
} from "../feedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({
        type,
        comment,
        screenshot,
        emailReplyTo,
        emailSendTo,
    }: any) {
        try {
            const newFeedback = (await prismaClient.feedback.create({
                data: {
                    comment,
                    type,
                    screenshot,
                    emailReplyTo,
                    emailSendTo,
                },
            })) as FeedbackCreateData;

            return newFeedback;
        } catch (error) {
            throw new Error(`erro ao criar feedback no prisma: ${error}`);
        }
    }
}
