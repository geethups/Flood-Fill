-- MySQL dump 10.13  Distrib 5.6.30, for Linux (x86_64)
--
-- Host: localhost    Database: floodFillDB
-- ------------------------------------------------------
-- Server version	5.6.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AnswerTable`
--

DROP TABLE IF EXISTS `AnswerTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AnswerTable` (
  `idAnswerTable` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `answerDesc` varchar(500) NOT NULL,
  `likeCount` int(10) DEFAULT NULL,
  `dislikeCount` int(10) DEFAULT NULL,
  `questionDesc` varchar(500) DEFAULT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `answerLink` varchar(500) DEFAULT NULL,
  `editUser` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`answerDesc`),
  KEY `fk_AnsFlood` (`questionDesc`),
  KEY `id` (`idAnswerTable`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AnswerTable`
--

LOCK TABLES `AnswerTable` WRITE;
/*!40000 ALTER TABLE `AnswerTable` DISABLE KEYS */;
INSERT INTO `AnswerTable` VALUES (15,'',18,0,'haha','geethu','[\"\"]','geethu'),(12,'$id=trim($_POST[\"id\"]);\n$then=\"SELECT * FROM tablename WHERE id=$id\";\n$count=mysql_num_rows($bbbb);\necho $count.\'<br>\';',4,2,'What is wrong with this query: \"SELECT * FROM table WHERE id = $_POST[ \'id\' ]\"?','geethu','[\"https://www.sitepoint.com/community/t/what-is-wrong-with-this-query-please-reply-as-soon-as-possible/36903/4\"]','geethu'),(10,'A content provider manages access to a central repository of data.',9,2,'What is a ContentProvider and what is it typically used for?','geethu','[\"https://developer.android.com/guide/topics/providers/content-provider-basics.html\",\"http://www.compiletimeerror.com/2013/12/content-provider-in-android.html\"]','san'),(19,'dsadsdA',1,0,'asfsafas','geethu','[\"DDadD\"]',''),(22,'DWSD',0,0,'ASAS','geethu','[\"WQDW\"]',''),(16,'hjng adsfsaf',3,4,'haha','geethu','[\"jggf\"]','geethu'),(9,'Linking css.',0,0,'Which is the best way to link CSS files with html?','geethu','[\"\"]',NULL),(21,'saf',1,0,'dsadsad','geethu','[\"safasf\",\"jgdjgdj\"]',''),(13,'test',3,0,'Is it possible to call a child class method from a parent class object?','geethu','[\"dD\"]','geethu'),(11,'The first one reduces the change to accidentally set the variable, while the other one potentially reduces needs context while reading the code.',1,0,'What is the preferred way to write this if statement, and why?\nif( 5 == $someVar ) or if( $someVar == 5 )','geethu','[\"\"]',NULL),(4,'The most common method of attaching CSS rules to an HTML document is linking to a separate CSS file.',0,0,'Which is the best way to link CSS files with html?','meenu','[\"http://matthewjamestaylor.com/blog/adding-css-to-html-with-link-embed-inline-and-import\",\"https://www.w3.org/TR/html401/present/styles.html\"]',NULL),(2,'Though this is possible, it is not at all recommended as it kind of destroys the reason for inheritance.',38,18,'Is it possible to call a child class method from a parent class object?','geethu','[\"http://stackoverflow.com/questions/11466441/call-a-child-class-method-from-a-parent-class-object\"]','geethu'),(17,'vcsfc',0,1,'haha','geethu','[\"sds\"]',''),(14,'vfcasdfsaf',7,1,'haha','geethu','[\"safsaf\",\"hfdhdfh\"]','geethu'),(18,'xaSD',0,2,'Is it possible to call a child class method from a parent class object?','geethu','[\"ADSAD\"]',''),(20,'xdadA',0,0,'What is TestNG framework in Selenium?','geethu','[\"DAD\"]',''),(3,'XMLHttpRequest is asynchronous, it doesn\'t work that way. When you use xmlhttp.send(null); you have to define callback function that will be executed when the server responds with the data, otherwise you are trying to access empty data.',0,1,'XMLHttpRequest.send returns undefined','geethu','[\"http://stackoverflow.com/questions/9151834/javascript-xmlhttprequest-result-are-always-undefined\",\"http://stackoverflow.com/questions/11493505/xmlhttprequest-when-returning-responsetext-to-another-function-it-returns-und\"]','geethu');
/*!40000 ALTER TABLE `AnswerTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LikeTable`
--

DROP TABLE IF EXISTS `LikeTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LikeTable` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `answerDesc` varchar(500) DEFAULT NULL,
  `user` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LikeTable`
--

LOCK TABLES `LikeTable` WRITE;
/*!40000 ALTER TABLE `LikeTable` DISABLE KEYS */;
INSERT INTO `LikeTable` VALUES (1,'dsad','geethu'),(2,'hjng','geethu'),(3,'vcsfc','geethu'),(4,'vfcasdfsaf','geethu'),(5,'test','geethu'),(8,'xaSD','geethu'),(9,'test','josmin'),(21,'xaSD','josmin'),(31,'dsadsdA','geethu'),(32,'A content provider manages access to a centra','geethu'),(33,'A content provider manages access to a centra','geethu'),(34,'A content provider manages access to a centra','geethu'),(35,'A content provider manages access to a centra','geethu'),(36,'A content provider manages access to a centra','geethu'),(37,'A content provider manages access to a centra','geethu'),(38,'A content provider manages access to a centra','geethu'),(39,'A content provider manages access to a centra','geethu'),(40,'A content provider manages access to a centra','geethu'),(41,'Though this is possible, it is not at all recommended as it kind of destroys the reason for inheritance.','geethu'),(42,'xdadA','geethu'),(43,'The first one reduces the change to accidentally set the variable, while the other one potentially reduces needs context while reading the code.','geethu'),(44,'XMLHttpRequest is asynchronous, it doesn\'t work that way. When you use xmlhttp.send(null); you have to define callback function that will be executed when the server responds with the data, otherwise you are trying to access empty data.','geethu'),(45,'saf','geethu');
/*!40000 ALTER TABLE `LikeTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `QuestionsTable`
--

DROP TABLE IF EXISTS `QuestionsTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `QuestionsTable` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `questionTag` varchar(45) DEFAULT NULL,
  `questionDesc` varchar(500) NOT NULL,
  `technology` varchar(45) DEFAULT NULL,
  `technologyId` varchar(45) DEFAULT NULL,
  `userName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`questionDesc`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `QuestionsTable`
--

LOCK TABLES `QuestionsTable` WRITE;
/*!40000 ALTER TABLE `QuestionsTable` DISABLE KEYS */;
INSERT INTO `QuestionsTable` VALUES (2,'inheritance','Is it possible to call a child class method from a parent class object?','java','','josmin'),(22,'JMeter','Load Testing','QA','','Sanal'),(6,'android','What is a ContentProvider and what is it typically used for?','Android','','neethu'),(11,'Quality Assurance','What is TestNG framework in Selenium?','Selenium Automation','','tt'),(9,'PHP','What is the preferred way to write this if statement, and why?\nif( 5 == $someVar ) or if( $someVar == 5 )','PHP','','karthika'),(7,'wrong query','What is wrong with this query: \"SELECT * FROM table WHERE id = $_POST[ \'id\' ]\"?','PHP','','karthika'),(5,'Linking Style','Which is the best way to link CSS files with html?','html','','meenu'),(12,'Angular js testing framework','Which testing framework is widely accepted for Angular.js?','Angular.js','','viju'),(1,'http','XMLHttpRequest.send returns undefined','javascript','','geethu');
/*!40000 ALTER TABLE `QuestionsTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TechnologiesTable`
--

DROP TABLE IF EXISTS `TechnologiesTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TechnologiesTable` (
  `techId` int(11) NOT NULL AUTO_INCREMENT,
  `techName` varchar(45) NOT NULL,
  PRIMARY KEY (`techName`),
  KEY `techId` (`techId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TechnologiesTable`
--

LOCK TABLES `TechnologiesTable` WRITE;
/*!40000 ALTER TABLE `TechnologiesTable` DISABLE KEYS */;
INSERT INTO `TechnologiesTable` VALUES (1,'HTML'),(2,'Javascript'),(3,'PHP'),(4,'Node.js'),(5,'AngularJS'),(6,'MySQL'),(7,'Java'),(8,'Python'),(9,'Objective-C'),(10,'Ruby'),(11,'C, C++ and C#'),(12,'jQuery'),(13,'WordPress'),(14,'JSON'),(15,'TypeScript');
/*!40000 ALTER TABLE `TechnologiesTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserTable`
--

DROP TABLE IF EXISTS `UserTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserTable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `userType` varchar(45) DEFAULT NULL,
  `skills` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userName`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserTable`
--

LOCK TABLES `UserTable` WRITE;
/*!40000 ALTER TABLE `UserTable` DISABLE KEYS */;
INSERT INTO `UserTable` VALUES (1,'geethu','admin','angular js\nnode js\nhtml\ncss','9855555555','geethusubrahmanian@gmail.com','geethuN123');
/*!40000 ALTER TABLE `UserTable` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-06 17:17:57
