/*
SQLyog Ultimate - MySQL GUI v8.2 
MySQL - 5.0.24a-community-nt : Database - db_capstone
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_capstone` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `db_capstone`;

/*Table structure for table `admin_credentials` */

DROP TABLE IF EXISTS `admin_credentials`;

CREATE TABLE `admin_credentials` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(100) NOT NULL default '',
  `hashed_password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_admin_date` */

DROP TABLE IF EXISTS `tbl_admin_date`;

CREATE TABLE `tbl_admin_date` (
  `Disabled_Dates` date default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_admin_timeslot` */

DROP TABLE IF EXISTS `tbl_admin_timeslot`;

CREATE TABLE `tbl_admin_timeslot` (
  `DoR_Timeslots` datetime default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_appointments` */

DROP TABLE IF EXISTS `tbl_appointments`;

CREATE TABLE `tbl_appointments` (
  `ID` int(11) NOT NULL auto_increment,
  `First_Name` varchar(100) default NULL,
  `Middle_Name` varchar(100) default NULL,
  `Last_Name` varchar(100) default NULL,
  `Email_Address` varchar(100) default NULL,
  `Appointment_Schedule` datetime default NULL,
  `Dental_Reason` varchar(100) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_medical_history` */

DROP TABLE IF EXISTS `tbl_medical_history`;

CREATE TABLE `tbl_medical_history` (
  `ID` int(100) NOT NULL auto_increment,
  `Physicians_Name` varchar(50) default NULL,
  `Present_Medical_Care` varchar(50) default NULL,
  `q1` varchar(50) default NULL,
  `q2` varchar(50) default NULL,
  `q3` varchar(50) default NULL,
  `q4` varchar(50) default NULL,
  `q5` varchar(50) default NULL,
  `q6` varchar(50) default NULL,
  `q7` varchar(50) default NULL,
  `q8` varchar(50) default NULL,
  `q9` varchar(50) default NULL,
  `q10` varchar(50) default NULL,
  `q11` varchar(50) default NULL,
  `q12` varchar(50) default NULL,
  `q13` varchar(50) default NULL,
  `Medical_Conditions` varchar(800) default NULL,
  `other` varchar(200) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_messages` */

DROP TABLE IF EXISTS `tbl_messages`;

CREATE TABLE `tbl_messages` (
  `ID` int(11) NOT NULL auto_increment,
  `First_Name` varchar(100) default NULL,
  `Middle_Name` varchar(100) default NULL,
  `Last_Name` varchar(100) default NULL,
  `Email_Address` varchar(100) default NULL,
  `Subject` varchar(100) default NULL,
  `Message` varchar(500) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_patient_information_record` */

DROP TABLE IF EXISTS `tbl_patient_information_record`;

CREATE TABLE `tbl_patient_information_record` (
  `ID` int(100) NOT NULL auto_increment,
  `First_Name` varchar(100) default NULL,
  `Middle_Name` varchar(100) default NULL,
  `Last_Name` varchar(100) default NULL,
  `Sex` varchar(50) default NULL,
  `Contact_No` varchar(11) default NULL,
  `Email_Address` varchar(100) default NULL,
  `Birthdate` date default NULL,
  `Age` int(10) default NULL,
  `Religion` varchar(50) default NULL,
  `Nationality` varchar(50) default NULL,
  `Home_Address` varchar(200) default NULL,
  `Parent_Name` varchar(50) default NULL,
  `Parent_Contact_No` varchar(11) default NULL,
  `Parent_Occupation` varchar(50) default NULL,
  `Date` date default NULL,
  `Dental_Reason` varchar(200) default NULL,
  `Previous_Dentist` varchar(50) default NULL,
  `Last_Visit` date default NULL,
  `Valid_ID` varchar(100) default NULL,
  `Appointment_Schedule` datetime default NULL,
  `Date_Created` date default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_timeslots_booked` */

DROP TABLE IF EXISTS `tbl_timeslots_booked`;

CREATE TABLE `tbl_timeslots_booked` (
  `ID` int(11) NOT NULL auto_increment,
  `Appointment_Schedule` datetime default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_treatment_record` */

DROP TABLE IF EXISTS `tbl_treatment_record`;

CREATE TABLE `tbl_treatment_record` (
  `T_ID` int(11) NOT NULL auto_increment,
  `ID` int(11) default NULL,
  `Date` date default NULL,
  `Procedure` varchar(100) default NULL,
  `Remarks` varchar(100) default NULL,
  `Amount_Charged` float default NULL,
  `Amount_Paid` float default NULL,
  `Balance` float default NULL,
  `Next_Appointment` varchar(20) default NULL,
  PRIMARY KEY  (`T_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `tbl_verification` */

DROP TABLE IF EXISTS `tbl_verification`;

CREATE TABLE `tbl_verification` (
  `ID` int(11) NOT NULL auto_increment,
  `Email_Address` varchar(100) default '',
  `Password` varchar(20) default '',
  PRIMARY KEY  (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
