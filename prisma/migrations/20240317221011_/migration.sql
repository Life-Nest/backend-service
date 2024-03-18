/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ADD COLUMN     "password_hash" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_email_key" ON "Hospital"("email");
