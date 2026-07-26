/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Recipient` table. All the data in the column will be lost.
  - Added the required column `name` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Recipient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recipient" DROP CONSTRAINT "Recipient_accountId_fkey";

-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipient" ADD CONSTRAINT "Recipient_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
