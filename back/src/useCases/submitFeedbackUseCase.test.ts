import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendMainSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMainSpy }
);

describe("Submit feedback", () => {
    it("should be able to submit a feedback", async () => {
        await expect(
            submitFeedback.execute({
                type: "BUG",
                comment: "example commet",
                emailReplyTo: "email@gmail.com",
                emailSendTo: "email@gmail.com",
                screenshot: "data:image/png;base6438339003kskmks9m29m29m29",
                title: "BUG",
            })
        ).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMainSpy).toHaveBeenCalled();
    });

    it("should not be able to submit a feedback without type", async () => {
        await expect(
            submitFeedback.execute({
                type: "",
                comment: "example commet",
                emailReplyTo: "email@gmail.com",
                emailSendTo: "email@gmail.com",
                screenshot: "data:image/png;base6438339003kskmks9m29m29m29",
            })
        ).rejects.toThrow();
    });

    it("should not be able to submit a feedback without comment", async () => {
        await expect(
            submitFeedback.execute({
                type: "BUG",
                comment: "",
                screenshot: "data:image/png;base6438339003kskmks9m29m29m29",
            })
        ).rejects.toThrow();
    });

    it("should not be able to submit a feedback with an invalid screenshot", async () => {
        await expect(
            submitFeedback.execute({
                type: "BUG",
                comment: "example comment",
                screenshot: "invalid.jpg",
            })
        ).rejects.toThrow();
    });
});
