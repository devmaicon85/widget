export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
    emailReplyTo?: string;
    emailSendTo?: string;
}
export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<FeedbackCreateData>;
}
