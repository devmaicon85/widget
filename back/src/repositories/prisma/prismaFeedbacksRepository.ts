import { prisma } from "../../prisma";
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
            const newFeedback = (await prisma.feedback.create({
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
