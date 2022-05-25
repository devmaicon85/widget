-- CreateTable
CREATE TABLE "feedsbacks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "screenshot" TEXT,
    "emailSendTo" TEXT,
    "emailReplyTo" TEXT,

    CONSTRAINT "feedsbacks_pkey" PRIMARY KEY ("id")
);
