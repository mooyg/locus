/*
  Warnings:

  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `isSharing` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `Family` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,familyId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Member_id_key";

-- DropIndex
DROP INDEX "Member_userId_key";

-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "adminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "id",
DROP COLUMN "isSharing",
ALTER COLUMN "isAdmin" DROP DEFAULT,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("familyId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Family_adminId_key" ON "Family"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_userId_familyId_key" ON "Member"("userId", "familyId");

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
