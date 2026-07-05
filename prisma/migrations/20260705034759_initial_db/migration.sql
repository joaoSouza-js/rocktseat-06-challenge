-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ScheduleDay" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliverer" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deliverer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DelivererSchedule" (
    "id" TEXT NOT NULL,
    "delivererId" TEXT NOT NULL,
    "day" "ScheduleDay" NOT NULL,
    "shiftStart" INTEGER NOT NULL,
    "shiftEnd" INTEGER NOT NULL,

    CONSTRAINT "DelivererSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipient" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliver" (
    "id" TEXT NOT NULL,
    "delivererId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" "DeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deliver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_cpf_key" ON "Account"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Account_phone_key" ON "Account"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Deliverer_accountId_key" ON "Deliverer"("accountId");

-- CreateIndex
CREATE INDEX "DelivererSchedule_delivererId_day_idx" ON "DelivererSchedule"("delivererId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_accountId_key" ON "Recipient"("accountId");

-- CreateIndex
CREATE INDEX "Deliver_delivererId_status_idx" ON "Deliver"("delivererId", "status");

-- CreateIndex
CREATE INDEX "Deliver_recipientId_idx" ON "Deliver"("recipientId");

-- CreateIndex
CREATE INDEX "Deliver_status_idx" ON "Deliver"("status");

-- AddForeignKey
ALTER TABLE "Deliverer" ADD CONSTRAINT "Deliverer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DelivererSchedule" ADD CONSTRAINT "DelivererSchedule_delivererId_fkey" FOREIGN KEY ("delivererId") REFERENCES "Deliverer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipient" ADD CONSTRAINT "Recipient_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_delivererId_fkey" FOREIGN KEY ("delivererId") REFERENCES "Deliverer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
