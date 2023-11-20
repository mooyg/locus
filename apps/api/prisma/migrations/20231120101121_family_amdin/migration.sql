/*
  Warnings:

  - You are about to drop the column `adminId` on the `Family` table. All the data in the column will be lost.
  - You are about to drop the column `admin` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Family" DROP CONSTRAINT "Family_adminId_fkey";

-- DropIndex
DROP INDEX "Family_adminId_key";

-- DropIndex
DROP INDEX "User_admin_key";

-- AlterTable
ALTER TABLE "Family" DROP COLUMN "adminId";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "admin";
