-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'DEPARTMENT_ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('EVENTS', 'RESEARCH', 'WEBOPS', 'CREATIVE', 'PR');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'CURRENT', 'LIVE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('DISCUSSION', 'DEBATE', 'OFF_THE_BEAT', 'GROUP_DISCUSSION', 'STORYTELLING', 'WORKSHOP', 'OTHER');

-- CreateEnum
CREATE TYPE "EventAccess" AS ENUM ('REGISTRATION', 'OPEN', 'TBD');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('SPEECH', 'ARTICLE', 'RESEARCH');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "department" "Department",
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL,
    "access" "EventAccess" NOT NULL,
    "venue" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "meetLink" TEXT,
    "registrationLink" TEXT,
    "eventDocLink" TEXT,
    "coverImageLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" "ContentType" NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "moreInfoLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventId" TEXT,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageLink" TEXT,
    "linkedinLink" TEXT,
    "department" "Department",
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VeritasDigest" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "volume" INTEGER NOT NULL,
    "issue" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VeritasDigest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteStats" (
    "id" TEXT NOT NULL,
    "societyMemberCount" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
