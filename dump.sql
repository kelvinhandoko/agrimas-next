-- MySQL dump 10.13  Distrib 9.1.0, for Linux (aarch64)
--
-- Host: localhost    Database: agrimas-next
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Account`
--

DROP TABLE IF EXISTS `Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Account` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `groupAccountId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `posisi` enum('DEBIT','CREDIT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_code_key` (`code`),
  KEY `Account_groupAccountId_fkey` (`groupAccountId`),
  KEY `Account_companyId_fkey` (`companyId`),
  CONSTRAINT `Account_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Account_groupAccountId_fkey` FOREIGN KEY (`groupAccountId`) REFERENCES `GroupAccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Account`
--

LOCK TABLES `Account` WRITE;
/*!40000 ALTER TABLE `Account` DISABLE KEYS */;
INSERT INTO `Account` VALUES ('cm4jim0cd0005jeehe2l3chx8','1.1.1','1','2024-12-11 06:34:16.766','cm4gjxo6f0001je50jw76v3fp','kas','DEBIT','2024-12-11 06:34:16.766'),('cm4kwte1p0003jcgdc3qffmcq','3.1.1','1','2024-12-12 05:59:41.917','cm4kwqntt0001jcgdqw8iuoy9','modal usaha pt','CREDIT','2024-12-12 05:59:41.917');
/*!40000 ALTER TABLE `Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Company` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Company_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
INSERT INTO `Company` VALUES ('1','Company 1','Rogatque hoc sanciret adipsum interi depravatum maxim, necest erius et ant inem deniquo orum de.','2024-12-09 03:55:34.843','2020-04-04 10:14:50.000');
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GroupAccount`
--

DROP TABLE IF EXISTS `GroupAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GroupAccount` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountClass` enum('ASSET','LIABILITY','EQUITY','REVENUE','EXPENSE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `GroupAccount_code_key` (`code`),
  KEY `GroupAccount_companyId_fkey` (`companyId`),
  CONSTRAINT `GroupAccount_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GroupAccount`
--

LOCK TABLES `GroupAccount` WRITE;
/*!40000 ALTER TABLE `GroupAccount` DISABLE KEYS */;
INSERT INTO `GroupAccount` VALUES ('cm4gjxo6f0001je50jw76v3fp','aset lancar','ASSET','1','2024-12-09 04:48:01.959','2024-12-09 05:17:09.888','1.1'),('cm4gkg2420003je50o9boaokp','aset tetap','ASSET','1','2024-12-09 05:02:19.827','2024-12-09 05:02:19.827','1.2'),('cm4gkyuyv0005je50gd21u2sj','beban operasional','EXPENSE','1','2024-12-09 05:16:57.031','2024-12-09 05:16:57.031','5.1'),('cm4j9mtke0001jeehxcjb6s2f','pendapatan usaha','REVENUE','1','2024-12-11 02:22:58.094','2024-12-11 02:22:58.094','4.1'),('cm4kwqntt0001jcgdqw8iuoy9','modal usaha','EQUITY','1','2024-12-12 05:57:34.625','2024-12-12 05:57:34.625','3.1');
/*!40000 ALTER TABLE `GroupAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Journal`
--

DROP TABLE IF EXISTS `Journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Journal` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL,
  `ref` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('GENERAL','ADJUSTING','REVERSING','CLOSING') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `companyId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Journal_companyId_fkey` (`companyId`),
  CONSTRAINT `Journal_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Journal`
--

LOCK TABLES `Journal` WRITE;
/*!40000 ALTER TABLE `Journal` DISABLE KEYS */;
INSERT INTO `Journal` VALUES ('cm4kxd9tj0007jcgdo93ev0om','2024-12-11 17:00:00.000','JU-1',NULL,'GENERAL','2024-12-12 06:15:09.560','2024-12-12 06:15:09.560','1'),('cm4kynzyn000bjcgdpvontqi2','2024-12-11 17:00:00.000','JU-2',NULL,'GENERAL','2024-12-12 06:51:29.616','2024-12-12 06:51:29.616','1');
/*!40000 ALTER TABLE `Journal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `JournalDetail`
--

DROP TABLE IF EXISTS `JournalDetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `JournalDetail` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `debit` int NOT NULL,
  `credit` int NOT NULL,
  `journalId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subAccountId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `JournalDetail_journalId_fkey` (`journalId`),
  KEY `JournalDetail_accountId_fkey` (`accountId`),
  KEY `JournalDetail_subAccountId_fkey` (`subAccountId`),
  CONSTRAINT `JournalDetail_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `JournalDetail_journalId_fkey` FOREIGN KEY (`journalId`) REFERENCES `Journal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `JournalDetail_subAccountId_fkey` FOREIGN KEY (`subAccountId`) REFERENCES `SubAccount` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `JournalDetail`
--

LOCK TABLES `JournalDetail` WRITE;
/*!40000 ALTER TABLE `JournalDetail` DISABLE KEYS */;
INSERT INTO `JournalDetail` VALUES ('cm4kxd9ts0008jcgdvc4icuvd',100000,0,'cm4kxd9tj0007jcgdo93ev0om','cm4jim0cd0005jeehe2l3chx8',NULL,'2024-12-12 06:15:09.568','2024-12-12 06:15:09.568'),('cm4kxd9ts0009jcgdd28v137p',0,100000,'cm4kxd9tj0007jcgdo93ev0om','cm4kwte1p0003jcgdc3qffmcq',NULL,'2024-12-12 06:15:09.568','2024-12-12 06:15:09.568'),('cm4kynzz1000cjcgdck3fk981',120000,0,'cm4kynzyn000bjcgdpvontqi2','cm4jim0cd0005jeehe2l3chx8',NULL,'2024-12-12 06:51:29.629','2024-12-12 06:51:29.629'),('cm4kynzz1000djcgd5fq4byuy',0,120000,'cm4kynzyn000bjcgdpvontqi2','cm4kwte1p0003jcgdc3qffmcq',NULL,'2024-12-12 06:51:29.629','2024-12-12 06:51:29.629');
/*!40000 ALTER TABLE `JournalDetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Report_Account`
--

DROP TABLE IF EXISTS `Report_Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Report_Account` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `accountId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `report` enum('NERACA','PERUBAHAN_MODAL','LABA_RUGI') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Report_Account_companyId_report_accountId_key` (`companyId`,`report`,`accountId`),
  KEY `Report_Account_accountId_fkey` (`accountId`),
  CONSTRAINT `Report_Account_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Report_Account_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Report_Account`
--

LOCK TABLES `Report_Account` WRITE;
/*!40000 ALTER TABLE `Report_Account` DISABLE KEYS */;
INSERT INTO `Report_Account` VALUES ('cm4jim0co0007jeeh8l0qr5xt','1','2024-12-11 06:34:16.777','2024-12-11 06:34:16.777','cm4jim0cd0005jeehe2l3chx8','NERACA'),('cm4kwte1t0005jcgd8jz9rf5e','1','2024-12-12 05:59:41.922','2024-12-12 05:59:41.922','cm4kwte1p0003jcgdc3qffmcq','PERUBAHAN_MODAL');
/*!40000 ALTER TABLE `Report_Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SubAccount`
--

DROP TABLE IF EXISTS `SubAccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SubAccount` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SubAccount_accountId_fkey` (`accountId`),
  KEY `SubAccount_companyId_fkey` (`companyId`),
  CONSTRAINT `SubAccount_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `SubAccount_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubAccount`
--

LOCK TABLES `SubAccount` WRITE;
/*!40000 ALTER TABLE `SubAccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `SubAccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `role` enum('OWNER','ADMIN','USER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('a9c4eb13-2820-4476-b8fd-ce6d17ff5409','admin','$argon2id$v=19$m=19456,t=2,p=1$ELCvKNPP4netEUhebs6q0w$l7XLaWtmzwrN/7CHieWz/1n77VBAS5i+urZJlSKfiGg','2024-12-09 03:55:34.838','2020-05-05 23:43:07.000','ADMIN','Idioresse as amus sentiaretiam neque eri et penderitat.');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Company`
--

DROP TABLE IF EXISTS `User_Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Company` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `User_Company_userId_fkey` (`userId`),
  KEY `User_Company_companyId_fkey` (`companyId`),
  CONSTRAINT `User_Company_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `User_Company_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Company`
--

LOCK TABLES `User_Company` WRITE;
/*!40000 ALTER TABLE `User_Company` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('02ad1169-2669-4b3d-bf21-34d320cd21eb','e0cbde55d6c7fdc9bc75c86710acd6ca2f47ca54b65e01cdcb75b80f1d8184ac','2024-12-01 20:08:53.276','20241031083850_add_owner_role',NULL,NULL,'2024-12-01 20:08:53.257',1),('13f026c5-3af4-48bf-9af6-5e7c4d1703ec','5985329e851c836a0c29f7f6a89690bb3ca576f01e0c467ecabd299d411eabcf','2024-12-01 20:08:53.066','20241026210021_add_image_to_user',NULL,NULL,'2024-12-01 20:08:53.054',1),('5cb424b5-2fcb-4eaf-bb68-5ab0bdf3a8da','8770fd74a95c7b789948e06bfdc91962edbabe23b366f1101ba16e6aa5d935bd','2024-12-01 20:08:53.286','20241031085521_add_code_to_group_account',NULL,NULL,'2024-12-01 20:08:53.277',1),('71d525f2-adf9-4d19-832f-dda94d84fe26','ec53176db6760905fea287e3af95521b3c27254b6ffee692668afa616c656f2b','2024-12-01 20:08:53.053','20241026202821_',NULL,NULL,'2024-12-01 20:08:53.044',1),('7d63ba49-1d1f-4c10-a8b7-e72d16214e29','9e70b1c375e839e4b2cd840ba380ae66f3445b0d04ea3bef8865646cb4f19767','2024-12-01 20:08:53.019','20241026191341_initial',NULL,NULL,'2024-12-01 20:08:52.923',1),('86939a50-2fde-407c-acfd-b8b2065e678c','1efae9d262de3e8c6a329852c0ebb9f60eb63228059ed306f07c5415160544d4','2024-12-01 20:09:06.643','20241201200906_rename_laporan_report',NULL,NULL,'2024-12-01 20:09:06.629',1),('949399c6-f7b6-4dbb-a1ce-7130fc5ef2af','550332bdde44d10781b9e12a9dcfe61aaa115eb0e496e350a010d8462cb0b6d6','2024-12-06 13:10:19.466','20241206131019_change_float_to_int_to_debit_and_credit_in_journal_detail',NULL,NULL,'2024-12-06 13:10:19.441',1),('9d012dd0-32a2-46a4-97e1-a8cf4278dcf8','6cf36ea0db4383bf0afa0f2f60b94b7f2d4a6660e846d51837bf4559ccb76074','2024-12-01 20:08:53.256','20241031081707_edit_name',NULL,NULL,'2024-12-01 20:08:53.068',1),('a0aff4db-b542-4854-8070-bc0cf834b048','0237ec0a31d9c7267bd38e505c05f75498642bd2b415e711a53c8e5d99476550','2024-12-01 20:08:53.043','20241026195842_add_unique_constraint_to_company_name',NULL,NULL,'2024-12-01 20:08:53.031',1),('b701f6a8-7e08-4b29-8495-0935087e5cdd','d80259858de2c6dc58a52c932e6074774132d1cbcf2f56b3ababe94ab3dcae7c','2024-12-01 20:08:53.029','20241026192859_rename_role_to_role_in_user',NULL,NULL,'2024-12-01 20:08:53.021',1),('de7a9fd4-c62b-4eb3-a8b1-dd59a137b3a9','57949cecfb80e0938c2e839ba610b2e409a9135d7b02be6dc2c027b202125dd2','2024-12-05 23:56:04.902','20241205235604_add_unique_constaint_on_group_account_code_and_account_code',NULL,NULL,'2024-12-05 23:56:04.870',1),('ee2f3527-6afb-4060-9f55-5f6664dccfee','e3a26daadb54ccde044a0592931e79dcab16915fe056c05b830ef286cf10b483','2024-12-06 13:04:23.301','20241206130423_make_desc_optional_in_journal',NULL,NULL,'2024-12-06 13:04:23.277',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12  7:33:12
