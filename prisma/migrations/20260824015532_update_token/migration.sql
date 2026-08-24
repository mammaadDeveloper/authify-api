/*
  Warnings:

  - You are about to drop the column `token_hash` on the `tokens` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tokens_token_hash_token_idx";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "token_hash";

-- CreateIndex
CREATE INDEX "tokens_token_idx" ON "tokens"("token");
