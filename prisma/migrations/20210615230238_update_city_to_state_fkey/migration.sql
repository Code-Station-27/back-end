/*
  Warnings:

  - You are about to drop the column `state_id` on the `City` table. All the data in the column will be lost.
  - Added the required column `state_uf` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_state_id_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "state_id",
ADD COLUMN     "state_uf" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "City" ADD FOREIGN KEY ("state_uf") REFERENCES "State"("uf") ON DELETE CASCADE ON UPDATE CASCADE;
