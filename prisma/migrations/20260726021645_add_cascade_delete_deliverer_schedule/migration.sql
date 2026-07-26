-- DropForeignKey
ALTER TABLE "DelivererSchedule" DROP CONSTRAINT "DelivererSchedule_delivererId_fkey";

-- AddForeignKey
ALTER TABLE "DelivererSchedule" ADD CONSTRAINT "DelivererSchedule_delivererId_fkey" FOREIGN KEY ("delivererId") REFERENCES "Deliverer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
