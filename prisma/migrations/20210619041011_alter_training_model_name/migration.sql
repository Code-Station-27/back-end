/*
  Warnings:

  - You are about to drop the `Trainig` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trainig" DROP CONSTRAINT "Trainig_personal_id_fkey";

-- DropForeignKey
ALTER TABLE "Trainig" DROP CONSTRAINT "Trainig_user_id_fkey";

-- DropTable
DROP TABLE "Trainig";

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "personal_id" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "hour" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Training" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD FOREIGN KEY ("personal_id") REFERENCES "Personal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
