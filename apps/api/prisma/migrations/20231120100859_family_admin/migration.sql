/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `Family` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[admin]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Family` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "adminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Family_adminId_key" ON "Family"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "User_admin_key" ON "User"("admin");

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
