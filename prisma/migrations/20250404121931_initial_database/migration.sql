-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
