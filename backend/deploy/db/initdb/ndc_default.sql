# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: ndc.koreacentral.cloudapp.azure.com (MySQL 11.3.2-MariaDB-1:11.3.2+maria~ubu2204)
# Database: nodaechul
# Generation Time: 2024-06-08 05:26:38 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table attendance
# ------------------------------------------------------------

CREATE TABLE `attendance` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `lecture_id` bigint(20) DEFAULT NULL,
  `date` date NOT NULL,
  `public_s3_url` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_project_group` (`lecture_id`),
  CONSTRAINT `fk_project_group` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table attendance_bounding_box
# ------------------------------------------------------------

CREATE TABLE `attendance_bounding_box` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `attendance_id` bigint(255) NOT NULL,
  `width` float NOT NULL,
  `height` float NOT NULL,
  `left_pos` float NOT NULL,
  `top` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_attendance_bounding_box_attendance` (`attendance_id`),
  CONSTRAINT `fk_attendance_bounding_box_attendance` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table attendance_user
# ------------------------------------------------------------

CREATE TABLE `attendance_user` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `attendance_id` bigint(255) NOT NULL,
  `user_id` bigint(255) DEFAULT NULL,
  `status` text DEFAULT NULL,
  `similarity` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_attendance_member_user` (`user_id`),
  KEY `fk_attendance_user_attendance` (`attendance_id`),
  CONSTRAINT `fk_attendance_member_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_attendance_user_attendance` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table lecture
# ------------------------------------------------------------

CREATE TABLE `lecture` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `invitation_code` text DEFAULT NULL,
  `created_by` bigint(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`(255)),
  KEY `fk_group_user` (`created_by`),
  CONSTRAINT `fk_group_user` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table lecture_user
# ------------------------------------------------------------

CREATE TABLE `lecture_user` (
  `user_id` bigint(20) NOT NULL,
  `lecture_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`,`lecture_id`),
  KEY `FK_group_TO_group_member_1` (`lecture_id`),
  KEY `FK_user_TO_group_member_1` (`user_id`),
  CONSTRAINT `FK_group_TO_group_member_1` FOREIGN KEY (`lecture_id`) REFERENCES `lecture` (`id`),
  CONSTRAINT `FK_user_TO_group_member_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



# Dump of table user
# ------------------------------------------------------------

CREATE TABLE `user` (
  `id` bigint(255) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `student_id` text DEFAULT NULL,
  `name` text NOT NULL,
  `avatar` text DEFAULT NULL,
  `avatar_url` longtext DEFAULT NULL,
  `password` text NOT NULL,
  `user_state` text NOT NULL,
  `user_role` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
