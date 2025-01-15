-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 15 jan. 2025 à 15:30
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `api_hackr`
--

-- --------------------------------------------------------

--
-- Structure de la table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `logs`
--

INSERT INTO `logs` (`id`, `userId`, `action`, `timestamp`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'User Registered', '2024-10-10 10:01:56', '2024-10-10 10:01:56', '2024-10-10 10:01:56'),
(2, NULL, 'User Registration Failed : User already exists', '2024-10-10 10:04:08', '2024-10-10 10:04:08', '2024-10-10 10:04:08'),
(3, NULL, 'User Registration Failed : User already exists', '2024-10-10 10:04:09', '2024-10-10 10:04:09', '2024-10-10 10:04:09'),
(4, 1, 'User Registration Failed: User already exists (testuser)', '2024-10-10 10:05:02', '2024-10-10 10:05:02', '2024-10-10 10:05:02'),
(5, 1, 'User Logged In', '2024-10-10 10:06:54', '2024-10-10 10:06:54', '2024-10-10 10:06:54'),
(6, 1, 'User Logged In', '2024-10-10 10:06:57', '2024-10-10 10:06:57', '2024-10-10 10:06:57'),
(7, 1, 'User Logged In', '2024-10-10 10:06:58', '2024-10-10 10:06:58', '2024-10-10 10:06:58'),
(8, 1, 'User Logged In', '2024-10-10 10:06:59', '2024-10-10 10:06:59', '2024-10-10 10:06:59'),
(9, 1, 'User Logged In', '2024-10-10 10:06:59', '2024-10-10 10:06:59', '2024-10-10 10:06:59'),
(10, 1, 'User Logged In', '2024-10-10 10:07:00', '2024-10-10 10:07:00', '2024-10-10 10:07:00'),
(11, 1, 'User Logged In', '2024-10-10 10:07:01', '2024-10-10 10:07:01', '2024-10-10 10:07:01'),
(12, 1, 'User Logged In', '2024-10-10 10:07:02', '2024-10-10 10:07:02', '2024-10-10 10:07:02'),
(13, 1, 'User Logged In', '2024-10-10 10:07:03', '2024-10-10 10:07:03', '2024-10-10 10:07:03'),
(14, 1, 'User Logged In', '2024-10-10 10:07:04', '2024-10-10 10:07:04', '2024-10-10 10:07:04'),
(15, 1, 'User Logged In', '2024-10-10 10:07:05', '2024-10-10 10:07:05', '2024-10-10 10:07:05'),
(16, 1, 'User Logged In: testuser', '2024-10-10 11:40:10', '2024-10-10 11:40:10', '2024-10-10 11:40:10'),
(17, 1, 'User Login Failed for username: testuser', '2024-10-10 11:46:29', '2024-10-10 11:46:29', '2024-10-10 11:46:29'),
(18, 1, 'User Logged In: testuser', '2024-10-10 11:46:32', '2024-10-10 11:46:32', '2024-10-10 11:46:32'),
(19, NULL, 'User Registration Failed for username: testuser', '2024-10-10 12:48:43', '2024-10-10 12:48:43', '2024-10-10 12:48:43'),
(20, 2, 'User Registered: testuserWithPermissions', '2024-10-10 12:48:55', '2024-10-10 12:48:55', '2024-10-10 12:48:55'),
(21, NULL, 'User Registration Failed for username: testuserWithPermissions', '2024-10-10 12:48:57', '2024-10-10 12:48:57', '2024-10-10 12:48:57'),
(22, 2, 'User Logged In: testuserWithPermissions', '2024-10-10 12:49:56', '2024-10-10 12:49:56', '2024-10-10 12:49:56'),
(23, 2, 'User Logged In: testuserWithPermissions', '2024-10-10 12:59:27', '2024-10-10 12:59:27', '2024-10-10 12:59:27'),
(24, 1, 'User Logged In: testuser', '2024-10-10 13:00:52', '2024-10-10 13:00:52', '2024-10-10 13:00:52'),
(25, 1, 'User Logged In: admin', '2024-10-10 14:18:07', '2024-10-10 14:18:07', '2024-10-10 14:18:07'),
(26, NULL, 'User Registration Failed for username: testuser', '2024-10-10 14:31:51', '2024-10-10 14:31:51', '2024-10-10 14:31:51'),
(27, NULL, 'User Registration Failed for username: testuser', '2024-10-10 14:34:32', '2024-10-10 14:34:32', '2024-10-10 14:34:32'),
(28, NULL, 'User Registration Failed for username: testuser (User already exists)', '2024-10-10 14:36:57', '2024-10-10 14:36:57', '2024-10-10 14:36:57'),
(29, 2, 'User Logged In: testuser', '2024-10-10 14:41:10', '2024-10-10 14:41:10', '2024-10-10 14:41:10'),
(30, 2, 'User Logged In: testuser', '2024-10-11 07:31:59', '2024-10-11 07:31:59', '2024-10-11 07:31:59'),
(31, 2, 'User Logged In: testuser', '2024-10-11 08:40:37', '2024-10-11 08:40:37', '2024-10-11 08:40:37'),
(32, 2, 'User Logged In: testuser', '2024-10-11 10:01:44', '2024-10-11 10:01:44', '2024-10-11 10:01:44'),
(33, 2, 'User Logged In: testuser', '2024-10-11 11:20:27', '2024-10-11 11:20:27', '2024-10-11 11:20:27'),
(34, NULL, 'User Registration Failed for username: testuser (User already exists)', '2024-10-11 11:52:48', '2024-10-11 11:52:48', '2024-10-11 11:52:48'),
(35, 1, 'User Logged In: admin', '2024-10-11 12:08:05', '2024-10-11 12:08:05', '2024-10-11 12:08:05'),
(36, 2, 'User Logged In: testuser', '2024-10-11 12:12:31', '2024-10-11 12:12:31', '2024-10-11 12:12:31'),
(37, 1, 'User Logged In: admin', '2024-10-11 12:13:11', '2024-10-11 12:13:11', '2024-10-11 12:13:11'),
(38, 2, 'User Logged In: testuser', '2024-10-11 12:18:39', '2024-10-11 12:18:39', '2024-10-11 12:18:39'),
(39, 1, 'User Logged In: admin', '2024-10-11 12:56:56', '2024-10-11 12:56:56', '2024-10-11 12:56:56'),
(40, 2, 'User Logged In: testuser', '2024-10-11 12:57:17', '2024-10-11 12:57:17', '2024-10-11 12:57:17'),
(41, 2, 'User Logged In: testuser', '2024-10-11 14:08:11', '2024-10-11 14:08:11', '2024-10-11 14:08:11'),
(42, 2, 'User Logged In: testuser', '2024-10-28 15:02:10', '2024-10-28 15:02:10', '2024-10-28 15:02:10'),
(43, 2, 'User Logged In: testuser', '2024-10-28 15:37:41', '2024-10-28 15:37:41', '2024-10-28 15:37:41'),
(44, 2, 'User Logged In: testuser', '2024-10-28 15:47:16', '2024-10-28 15:47:16', '2024-10-28 15:47:16'),
(45, 2, 'User Logged In: testuser', '2024-10-28 15:52:35', '2024-10-28 15:52:35', '2024-10-28 15:52:35'),
(46, 2, 'User Logged In: testuser', '2024-10-29 09:33:18', '2024-10-29 09:33:18', '2024-10-29 09:33:18'),
(47, 2, 'User Logged In: testuser', '2024-10-29 10:32:47', '2024-10-29 10:32:47', '2024-10-29 10:32:47'),
(48, 2, 'User Logged In: testuser', '2024-10-29 10:39:27', '2024-10-29 10:39:27', '2024-10-29 10:39:27'),
(49, 2, 'User Logged In: testuser', '2024-10-29 10:39:51', '2024-10-29 10:39:51', '2024-10-29 10:39:51'),
(50, 2, 'User Logged In: testuser', '2024-10-29 12:22:00', '2024-10-29 12:22:00', '2024-10-29 12:22:00'),
(51, 2, 'User Logged In: testuser', '2024-10-29 13:58:40', '2024-10-29 13:58:40', '2024-10-29 13:58:40'),
(52, 2, 'User Logged In: testuser', '2024-10-29 13:58:41', '2024-10-29 13:58:41', '2024-10-29 13:58:41'),
(53, 2, 'User Logged In: testuser', '2024-10-29 15:02:26', '2024-10-29 15:02:26', '2024-10-29 15:02:26'),
(54, 2, 'User Logged In: testuser', '2024-10-29 15:42:03', '2024-10-29 15:42:03', '2024-10-29 15:42:03'),
(55, 2, 'User Logged In: testuser', '2024-10-31 08:47:08', '2024-10-31 08:47:08', '2024-10-31 08:47:08'),
(56, 2, 'User Logged In: testuser', '2024-10-31 10:05:50', '2024-10-31 10:05:50', '2024-10-31 10:05:50'),
(57, 2, 'User Logged In: testuser', '2024-10-31 12:05:25', '2024-10-31 12:05:25', '2024-10-31 12:05:25'),
(58, 2, 'User Logged In: testuser', '2024-10-31 13:21:34', '2024-10-31 13:21:34', '2024-10-31 13:21:34'),
(59, 2, 'User Logged In: testuser', '2024-10-31 13:22:11', '2024-10-31 13:22:11', '2024-10-31 13:22:11'),
(60, 2, 'User Logged In: testuser', '2024-10-31 14:49:28', '2024-10-31 14:49:28', '2024-10-31 14:49:28'),
(61, 2, 'User Logged In: testuser', '2024-11-21 08:38:14', '2024-11-21 08:38:14', '2024-11-21 08:38:14'),
(62, 2, 'User Logged In: testuser', '2024-11-21 10:07:14', '2024-11-21 10:07:14', '2024-11-21 10:07:14'),
(63, 2, 'User Logged In: testuser', '2024-11-21 11:57:19', '2024-11-21 11:57:19', '2024-11-21 11:57:19'),
(64, 2, 'User Logged In: testuser', '2024-11-21 12:59:09', '2024-11-21 12:59:09', '2024-11-21 12:59:09'),
(65, 2, 'User Logged In: testuser', '2025-01-14 15:22:46', '2025-01-14 15:22:46', '2025-01-14 15:22:46'),
(66, 1, 'User Login Failed for username: admin (Incorrect password)', '2025-01-14 15:34:43', '2025-01-14 15:34:43', '2025-01-14 15:34:43'),
(67, 1, 'User Login Failed for username: admin (Incorrect password)', '2025-01-14 15:34:48', '2025-01-14 15:34:48', '2025-01-14 15:34:48'),
(68, 1, 'User Logged In: admin', '2025-01-14 15:34:52', '2025-01-14 15:34:52', '2025-01-14 15:34:52'),
(69, 2, 'User Logged In: testuser', '2025-01-14 15:35:07', '2025-01-14 15:35:07', '2025-01-14 15:35:07'),
(70, 1, 'User Logged In: admin', '2025-01-14 15:35:29', '2025-01-14 15:35:29', '2025-01-14 15:35:29'),
(71, 2, 'User Logged In: testuser', '2025-01-14 15:35:32', '2025-01-14 15:35:32', '2025-01-14 15:35:32'),
(72, 1, 'User Logged In: admin', '2025-01-14 15:42:14', '2025-01-14 15:42:14', '2025-01-14 15:42:14'),
(73, 2, 'User Logged In: testuser', '2025-01-14 15:42:26', '2025-01-14 15:42:26', '2025-01-14 15:42:26'),
(74, 2, 'User Logged In: testuser', '2025-01-15 08:11:02', '2025-01-15 08:11:02', '2025-01-15 08:11:02'),
(75, 1, 'User Logged In: admin', '2025-01-15 08:26:42', '2025-01-15 08:26:42', '2025-01-15 08:26:42'),
(76, 2, 'User Logged In: testuser', '2025-01-15 08:26:47', '2025-01-15 08:26:47', '2025-01-15 08:26:47'),
(77, 1, 'User Logged In: admin', '2025-01-15 08:37:26', '2025-01-15 08:37:26', '2025-01-15 08:37:26'),
(78, 2, 'User Logged In: testuser', '2025-01-15 08:37:29', '2025-01-15 08:37:29', '2025-01-15 08:37:29'),
(79, 1, 'User Logged In: admin', '2025-01-15 08:42:44', '2025-01-15 08:42:44', '2025-01-15 08:42:44'),
(80, 2, 'User Logged In: testuser', '2025-01-15 08:42:49', '2025-01-15 08:42:49', '2025-01-15 08:42:49'),
(81, 1, 'User Logged In: admin', '2025-01-15 09:01:40', '2025-01-15 09:01:40', '2025-01-15 09:01:40'),
(82, 2, 'User Logged In: testuser', '2025-01-15 09:01:43', '2025-01-15 09:01:43', '2025-01-15 09:01:43'),
(83, 2, 'User Logged In: testuser', '2025-01-15 09:01:48', '2025-01-15 09:01:48', '2025-01-15 09:01:48'),
(84, 2, 'User Logged In: testuser', '2025-01-15 10:25:30', '2025-01-15 10:25:30', '2025-01-15 10:25:30'),
(85, 2, 'Initiating sending of 10 emails to yael.busser@gmail.com', '2025-01-15 10:25:32', '2025-01-15 10:25:32', '2025-01-15 10:25:32'),
(86, 2, 'Successfully sent 10 emails to yael.busser@gmail.com', '2025-01-15 10:25:49', '2025-01-15 10:25:49', '2025-01-15 10:25:49'),
(87, 2, 'Initiating sending of 1 emails to gasti.tim@gmail.com', '2025-01-15 10:35:08', '2025-01-15 10:35:08', '2025-01-15 10:35:08'),
(88, 2, 'Successfully sent 1 emails to gasti.tim@gmail.com', '2025-01-15 10:35:10', '2025-01-15 10:35:10', '2025-01-15 10:35:10'),
(89, 2, 'Initiating sending of 1 emails to gasti.tim@gmail.com', '2025-01-15 10:48:51', '2025-01-15 10:48:51', '2025-01-15 10:48:51'),
(90, 2, 'Successfully sent 1 emails to gasti.tim@gmail.com', '2025-01-15 10:48:53', '2025-01-15 10:48:53', '2025-01-15 10:48:53'),
(91, 2, 'Initiating sending of 1 emails to gasti.timytgfgbftbtfb@gmail.com', '2025-01-15 10:50:33', '2025-01-15 10:50:33', '2025-01-15 10:50:33'),
(92, 2, 'Successfully sent 1 emails to gasti.timytgfgbftbtfb@gmail.com', '2025-01-15 10:50:35', '2025-01-15 10:50:35', '2025-01-15 10:50:35'),
(93, 2, 'Starting webpage generation using reference URL: https://www.linkedin.com/login', '2025-01-15 10:50:53', '2025-01-15 10:50:53', '2025-01-15 10:50:53'),
(94, 2, 'Initiating OSINT process for: Kevin Niel 0699465044 k.niel.pro@gmail.com kevinnieloff', '2025-01-15 10:50:57', '2025-01-15 10:50:57', '2025-01-15 10:50:57'),
(95, 2, 'Webpage generated successfully using reference URL: https://www.linkedin.com/login', '2025-01-15 10:51:04', '2025-01-15 10:51:04', '2025-01-15 10:51:04'),
(96, 2, 'OSINT data gathered', '2025-01-15 10:51:10', '2025-01-15 10:51:10', '2025-01-15 10:51:10'),
(97, 2, 'Relevant sites obtained: [\"https://kevinniel.fr/\",\"https://fr.linkedin.com/in/kevinniel\",\"https://www.malt.fr/profile/nielkevin\",\"https://github.com/kevinniel\",\"https://infonet.fr/dirigeants/66aa78785da7ac2c4bcb0208/\",\"https://fr-fr.facebook.com/public/Ke', '2025-01-15 10:51:19', '2025-01-15 10:51:19', '2025-01-15 10:51:19'),
(98, 2, 'Relevant sites analyzed', '2025-01-15 10:53:24', '2025-01-15 10:53:24', '2025-01-15 10:53:24'),
(99, 2, 'Final HTML generated', '2025-01-15 10:55:03', '2025-01-15 10:55:03', '2025-01-15 10:55:03'),
(100, 2, 'OSINT process completed successfully', '2025-01-15 10:55:03', '2025-01-15 10:55:03', '2025-01-15 10:55:03'),
(101, 2, 'Initiated password commonness check', '2025-01-15 11:01:34', '2025-01-15 11:01:34', '2025-01-15 11:01:34'),
(102, 2, 'Password check result: password is not common', '2025-01-15 11:01:34', '2025-01-15 11:01:34', '2025-01-15 11:01:34'),
(103, 2, 'User Logged In: testuser', '2025-01-15 12:45:48', '2025-01-15 12:45:48', '2025-01-15 12:45:48'),
(104, 2, 'Initiated DDoS simulation with 5 pings on target: google.com', '2025-01-15 12:45:50', '2025-01-15 12:45:50', '2025-01-15 12:45:50'),
(105, 2, 'DDoS simulation completed on target: google.com with 5 pings', '2025-01-15 12:45:50', '2025-01-15 12:45:50', '2025-01-15 12:45:50'),
(106, 2, 'User Logged In: testuser', '2025-01-15 13:22:39', '2025-01-15 13:22:39', '2025-01-15 13:22:39'),
(107, 1, 'User Logged In: admin', '2025-01-15 13:23:17', '2025-01-15 13:23:17', '2025-01-15 13:23:17'),
(108, 1, 'Admin requested latest logs', '2025-01-15 13:23:19', '2025-01-15 13:23:19', '2025-01-15 13:23:19'),
(109, 1, 'Admin successfully retrieved latest logs', '2025-01-15 13:23:19', '2025-01-15 13:23:19', '2025-01-15 13:23:19'),
(110, 1, 'Admin requested latest logs for user ID: 2', '2025-01-15 13:24:30', '2025-01-15 13:24:30', '2025-01-15 13:24:30'),
(111, 1, 'Admin successfully retrieved logs for user ID: 2', '2025-01-15 13:24:30', '2025-01-15 13:24:30', '2025-01-15 13:24:30'),
(112, 1, 'Admin requested logs for actions like: OSINT', '2025-01-15 13:28:08', '2025-01-15 13:28:08', '2025-01-15 13:28:08'),
(113, 1, 'Admin successfully retrieved logs for actions like: OSINT', '2025-01-15 13:28:08', '2025-01-15 13:28:08', '2025-01-15 13:28:08'),
(114, NULL, 'User Login Failed for username: testusername (User not found)', '2025-01-15 13:45:58', '2025-01-15 13:45:58', '2025-01-15 13:45:58'),
(115, 2, 'User Logged In: testuser', '2025-01-15 13:46:30', '2025-01-15 13:46:30', '2025-01-15 13:46:30'),
(116, 2, 'Requested password generation', '2025-01-15 13:48:28', '2025-01-15 13:48:28', '2025-01-15 13:48:28'),
(117, 2, 'Password generated successfully', '2025-01-15 13:48:28', '2025-01-15 13:48:28', '2025-01-15 13:48:28'),
(118, 2, 'Requested password generation', '2025-01-15 13:48:30', '2025-01-15 13:48:30', '2025-01-15 13:48:30'),
(119, 2, 'Password generated successfully', '2025-01-15 13:48:30', '2025-01-15 13:48:30', '2025-01-15 13:48:30'),
(120, 2, 'Requested password generation', '2025-01-15 13:48:31', '2025-01-15 13:48:31', '2025-01-15 13:48:31'),
(121, 2, 'Password generated successfully', '2025-01-15 13:48:31', '2025-01-15 13:48:31', '2025-01-15 13:48:31'),
(122, 2, 'Requested password generation', '2025-01-15 13:48:31', '2025-01-15 13:48:31', '2025-01-15 13:48:31'),
(123, 2, 'Password generated successfully', '2025-01-15 13:48:31', '2025-01-15 13:48:31', '2025-01-15 13:48:31'),
(124, 3, 'User Registered: user (Role: user)', '2025-01-15 14:09:24', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(125, 2, 'User Logged In: testuser', '2025-01-15 14:15:09', '2025-01-15 14:15:09', '2025-01-15 14:15:09'),
(126, 2, 'User Logged In: testuser', '2025-01-15 14:19:14', '2025-01-15 14:19:14', '2025-01-15 14:19:14'),
(127, 2, 'User Logged In: testuser', '2025-01-15 14:19:15', '2025-01-15 14:19:15', '2025-01-15 14:19:15');

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `permission` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`id`, `userId`, `permission`, `createdAt`, `updatedAt`) VALUES
(72, 3, 'verify_email', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(73, 3, 'generate_password', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(74, 3, 'send_emails', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(75, 3, 'phishing', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(76, 3, 'check_password', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(77, 3, 'domain_info', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(78, 3, 'fake_identity', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(79, 3, 'osint', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(80, 3, 'generate_secure_password', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(81, 3, 'ddos', '2025-01-15 14:09:24', '2025-01-15 14:09:24'),
(82, 2, 'verify_email', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(83, 2, 'generate_password', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(84, 2, 'send_emails', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(85, 2, 'phishing', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(86, 2, 'check_password', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(87, 2, 'domain_info', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(88, 2, 'fake_identity', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(89, 2, 'osint', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(90, 2, 'generate_secure_password', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(91, 2, 'ddos', '2025-01-15 14:15:04', '2025-01-15 14:15:04'),
(92, 2, 'random_image', '2025-01-15 14:15:04', '2025-01-15 14:15:04');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `token`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2a$10$GWOBI.RSWdXYGarhDg0oi./8WYkFWFdrzGeHtElarMWD2sxxgqBTq', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzY5NDczOTcsImV4cCI6MTczNjk1MDk5N30.1G58kcBZTd6qGYrD4sHjKndmcnm5yHCUV0NCIVzkUy4', '2024-10-10 10:01:56', '2025-01-15 13:23:17'),
(2, 'testuser', '$2a$10$NNPDMEp4MSrDAQDwEwkwtumA8xKQgr3ujAFrVObTSH2FovlFRoQQ.', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjk1MDc1NSwiZXhwIjoxNzM2OTU0MzU1fQ.YC97L8tY-tvIQZHMzBNH94wSZmwTNuWla5D05ipT9tc', '2024-10-10 12:48:55', '2025-01-15 14:19:15'),
(3, 'user', '$2a$10$HIFq/E9Dw79t6XOTAXRO8enXIzoZbCDosC.rb36H1LL.DqRAQZVbu', 'user', NULL, '2025-01-15 14:09:24', '2025-01-15 14:09:24');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
