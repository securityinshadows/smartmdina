-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 23, 2025 at 01:29 PM
-- Server version: 8.3.0
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartmdina`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
CREATE TABLE IF NOT EXISTS `applications` (
  `application_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `job_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `cv` varbinary(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`application_id`),
  KEY `FK65weib1lru9dkrbto5pv389vi` (`job_id`),
  KEY `FKfsfqljedcla632u568jl5qf3w` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citymaps`
--

DROP TABLE IF EXISTS `citymaps`;
CREATE TABLE IF NOT EXISTS `citymaps` (
  `created_at` datetime(6) DEFAULT NULL,
  `map_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `map_name` varchar(255) NOT NULL,
  `map_data` tinytext NOT NULL,
  PRIMARY KEY (`map_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `educationalservices`
--

DROP TABLE IF EXISTS `educationalservices`;
CREATE TABLE IF NOT EXISTS `educationalservices` (
  `rating` double DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `service_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `body` tinytext NOT NULL,
  `description` longtext,
  `average_rating` double DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `educationalservices`
--

INSERT INTO `educationalservices` (`rating`, `created_at`, `service_id`, `updated_at`, `address`, `image`, `tags`, `title`, `type`, `body`, `description`, `average_rating`) VALUES
(4.5, '2025-01-20 01:36:32.000000', 1, '2025-01-20 01:36:32.000000', '123 University Ave, City', 'laptop-deal.jpg', 'laptop, discount, student', 'Discount on Laptops', 'deal', 'Exclusive 20% off on all laptop purchases for students', 'Exclusive 20% off on all laptop purchases for students', 4.5);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `pay` double DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `job_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`pay`, `created_at`, `job_id`, `updated_at`, `description`, `status`, `tags`, `title`) VALUES
(2000, '2025-01-23 12:00:23.849300', 2, '2025-01-23 12:00:23.849300', 'hi', 'hi', 'hi', 'hi');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE IF NOT EXISTS `news` (
  `author_id` bigint NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `news_id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `body` tinytext NOT NULL,
  `description` longtext,
  PRIMARY KEY (`news_id`),
  KEY `FK3qvva8ftw201mxkeuirniflgb` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`author_id`, `date`, `news_id`, `image`, `status`, `tags`, `title`, `body`, `description`) VALUES
(18, '2025-01-21 11:50:03.000000', 1, 'https://itchronicles.com/wp-content/uploads/2020/11/where-is-ai-used.jpg', 'pending', 'ai, revolution, yourmum', 'AI revolutionizing the industry baby', 'so like ai is sooo cool now', 'ai is so amazing!!!');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
CREATE TABLE IF NOT EXISTS `ratings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `service_id` bigint NOT NULL,
  `rating` double NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqeq738st8tkuylwpwysriyhgs` (`service_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tourism`
--

DROP TABLE IF EXISTS `tourism`;
CREATE TABLE IF NOT EXISTS `tourism` (
  `rating` double DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `service_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `body` tinytext NOT NULL,
  `description` longtext,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tourism`
--

INSERT INTO `tourism` (`rating`, `created_at`, `service_id`, `updated_at`, `address`, `image`, `tags`, `title`, `type`, `body`, `description`) VALUES
(5, NULL, 2, NULL, 'hay assada', NULL, 'pizza', 'pizza', 'landmarks', 'pizza', 'pizza');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`created_at`, `updated_at`, `user_id`, `email`, `password`, `username`, `role`) VALUES
('2025-01-21 00:36:39.407685', '2025-01-21 00:36:40.719402', 18, 'hi@hi.com', 'hi', 'hi', 'admin'),
('2025-01-23 10:24:15.963011', '2025-01-23 10:24:15.963011', 21, 'example@example.com', 'example', 'example', 'user'),
('2025-01-23 10:57:01.715117', '2025-01-23 10:57:01.715117', 22, 'example1@gmail.com', 'example1', 'example1', 'user'),
('2025-01-23 11:01:22.604577', '2025-01-23 11:01:24.073554', 23, 'hi2@gmail.com', 'hi', 'hi2', 'user');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `FK65weib1lru9dkrbto5pv389vi` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`),
  ADD CONSTRAINT `FKfsfqljedcla632u568jl5qf3w` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `FK3qvva8ftw201mxkeuirniflgb` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
