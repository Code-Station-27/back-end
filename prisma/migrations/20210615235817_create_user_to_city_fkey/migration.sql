/*
  Warnings:

  - Added the required column `city_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
