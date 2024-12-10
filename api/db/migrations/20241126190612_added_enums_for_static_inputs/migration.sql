/*
  Warnings:

  - Changed the type of `eventType` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `placement` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `result` on the `Round` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('locals', 'storeRegional', 'onlineRegional', 'offlineRegional', 'storeUltimateCup', 'onlineUltimateCup', 'offlineUltimateCup', 'nationals', 'worlds');

-- CreateEnum
CREATE TYPE "PlacementType" AS ENUM ('first', 'second', 'top4', 'top8', 'top16', 'top32', 'top64', 'top128', 'top256', 'top512');

-- CreateEnum
CREATE TYPE "ResultsType" AS ENUM ('WW', 'LL', 'WLW', 'WLL', 'LWW', 'LWL', 'TIE');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventType",
ADD COLUMN     "eventType" "EventType" NOT NULL,
DROP COLUMN "placement",
ADD COLUMN     "placement" "PlacementType" NOT NULL;

-- AlterTable
ALTER TABLE "Round" DROP COLUMN "result",
ADD COLUMN     "result" "ResultsType" NOT NULL;
