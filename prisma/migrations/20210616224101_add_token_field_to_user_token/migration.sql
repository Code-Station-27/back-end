/*
  Warnings:

  - Added the required column `token` to the `User_Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User_Token" ADD COLUMN     "token" TEXT NOT NULL;
