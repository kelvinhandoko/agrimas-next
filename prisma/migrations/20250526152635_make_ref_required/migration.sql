/*
  Warnings:

  - Made the column `ref` on table `ReceiveItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ReceiveItem" ALTER COLUMN "ref" SET NOT NULL;
