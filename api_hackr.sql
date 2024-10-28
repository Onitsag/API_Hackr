-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 28 oct. 2024 à 17:36
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
(45, 2, 'User Logged In: testuser', '2024-10-28 15:52:35', '2024-10-28 15:52:35', '2024-10-28 15:52:35');

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
(17, 2, 'verify_email', '2024-10-11 12:57:11', '2024-10-11 12:57:11'),
(18, 2, 'generate_password', '2024-10-11 12:57:11', '2024-10-11 12:57:11'),
(19, 2, 'send_emails', '2024-10-11 12:57:11', '2024-10-11 12:57:11'),
(20, 2, 'generate_webpage', '2024-10-11 12:57:11', '2024-10-11 12:57:11');

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
(1, 'admin', '$2a$10$GWOBI.RSWdXYGarhDg0oi./8WYkFWFdrzGeHtElarMWD2sxxgqBTq', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Mjg2NTE0MTYsImV4cCI6MTcyODY1NTAxNn0.4Mgr5MsP0SMYNvJjJcVxhRfyeuy2DzkaEqnKMxPsPq8', '2024-10-10 10:01:56', '2024-10-11 12:56:56'),
(2, 'testuser', '$2a$10$NNPDMEp4MSrDAQDwEwkwtumA8xKQgr3ujAFrVObTSH2FovlFRoQQ.', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTczMDEzMDc1NSwiZXhwIjoxNzMwMTM0MzU1fQ.Zf8ck8-4Q1rS5UZQogZil6BVQu7U6fAPD1_Yo50kKYA', '2024-10-10 12:48:55', '2024-10-28 15:52:35');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
