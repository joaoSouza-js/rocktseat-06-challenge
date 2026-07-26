/*
  Warnings:

  - The primary key for the `DelivererSchedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DelivererSchedule` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('AVAILABLE', 'IN_ROUTE', 'OFFLINE', 'ON_BREAK', 'SUSPENDED', 'BUSY');

-- DropForeignKey
ALTER TABLE "DelivererSchedule" DROP CONSTRAINT "DelivererSchedule_delivererId_fkey";

-- DropIndex
DROP INDEX "DelivererSchedule_delivererId_day_idx";

-- AlterTable
ALTER TABLE "Deliverer" ADD COLUMN     "availability" "Availability" NOT NULL DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "DelivererSchedule" DROP CONSTRAINT "DelivererSchedule_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "DelivererSchedule_pkey" PRIMARY KEY ("delivererId", "day");

-- AddForeignKey
ALTER TABLE "DelivererSchedule" ADD CONSTRAINT "DelivererSchedule_delivererId_fkey" FOREIGN KEY ("delivererId") REFERENCES "Deliverer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
