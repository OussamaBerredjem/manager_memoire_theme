-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 30, 2024 at 12:03 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `daw_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `Administrateur`
--

CREATE TABLE `Administrateur` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Administrateur`
--

INSERT INTO `Administrateur` (`id`, `userId`) VALUES
(1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Candidature`
--

CREATE TABLE `Candidature` (
  `id` int(11) NOT NULL,
  `etudiantId` int(11) DEFAULT NULL,
  `projetId` int(11) DEFAULT NULL,
  `statut` enum('acceptee','rejetee','en attente') DEFAULT 'en attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Candidature`
--

INSERT INTO `Candidature` (`id`, `etudiantId`, `projetId`, `statut`) VALUES
(2, 8, 1, 'acceptee'),
(4, 1, 1, 'en attente');

--
-- Triggers `Candidature`
--
DELIMITER $$
CREATE TRIGGER `after_candidature_insert` AFTER INSERT ON `Candidature` FOR EACH ROW BEGIN
    DECLARE enseignant_id INT;
    DECLARE enseignant_nom VARCHAR(255);
    DECLARE projet_titre VARCHAR(255);

    -- Fetch the enseignantId, enseignant name, and projet titre associated with the projetId
    SELECT p.enseignantId, u.nom, p.titre INTO enseignant_id, enseignant_nom, projet_titre
    FROM Projet p
    JOIN Users u ON p.enseignantId = u.id
    WHERE p.id = NEW.projetId;

    -- Insert a notification for the enseignant with their name and project title
    INSERT INTO Notification (enseignantId, message, date)
    VALUES (enseignant_id, CONCAT('Cher ', enseignant_nom, ', une nouvelle candidature a été soumise pour votre projet: ', projet_titre, '.'), NOW());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_candidature_insert_admin_notify` AFTER INSERT ON `Candidature` FOR EACH ROW BEGIN
    DECLARE admin_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR
        SELECT userId FROM Administrateur;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor to loop through all admins
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO admin_id;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert a notification for each admin
        INSERT INTO Notification (etudiantId, message, date)
        VALUES (admin_id, 'Une nouvelle candidature a été soumise.', NOW());
    END LOOP;
    CLOSE cur;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_candidature_update` AFTER UPDATE ON `Candidature` FOR EACH ROW BEGIN
    DECLARE notification_message TEXT;

    -- Determine the message based on the updated statut
    IF NEW.statut = 'acceptee' THEN
        SET notification_message = 'Votre candidature a été acceptée.';
    ELSEIF NEW.statut = 'rejetee' THEN
        SET notification_message = 'Votre candidature a été rejetée.';
    ELSEIF NEW.statut = 'en attente' THEN
        SET notification_message = 'Votre candidature est en attente.';
    END IF;

    -- Insert the notification into the Notification table
    INSERT INTO Notification (etudiantId, message, date)
    VALUES (NEW.etudiantId, notification_message, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Groupe`
--

CREATE TABLE `Groupe` (
  `id` int(11) NOT NULL,
  `projetId` int(11) DEFAULT NULL,
  `nom` text DEFAULT NULL,
  `type` enum('monome','binome','trinome') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Groupe`
--

INSERT INTO `Groupe` (`id`, `projetId`, `nom`, `type`) VALUES
(1, 2, 'Groupe Gdsc', 'monome');

--
-- Triggers `Groupe`
--
DELIMITER $$
CREATE TRIGGER `after_groupe_insert_admin_notify` AFTER INSERT ON `Groupe` FOR EACH ROW BEGIN
    DECLARE admin_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR
        SELECT userId FROM Administrateur;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor to loop through all admins
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO admin_id;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert a notification for each admin
        INSERT INTO Notification (etudiantId, message, date)
        VALUES (admin_id, 'Un nouveau groupe a été créé.', NOW());
    END LOOP;
    CLOSE cur;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Member`
--

CREATE TABLE `Member` (
  `id` int(11) NOT NULL,
  `groupeId` int(11) DEFAULT NULL,
  `etudiantId` int(11) DEFAULT NULL,
  `statu` enum('attente','accepter') DEFAULT 'attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Member`
--

INSERT INTO `Member` (`id`, `groupeId`, `etudiantId`, `statu`) VALUES
(1, 1, 3, 'accepter'),
(2, 1, 1, 'attente');

--
-- Triggers `Member`
--
DELIMITER $$
CREATE TRIGGER `after_member_change` AFTER INSERT ON `Member` FOR EACH ROW BEGIN
    DECLARE groupe_nom VARCHAR(255);
    DECLARE etudiant_nom VARCHAR(255);
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur_etudiantId INT;
    DECLARE cur CURSOR FOR
        SELECT etudiantId
        FROM Member
        WHERE groupeId = NEW.groupeId AND statu = 'accepter';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Fetch the group name
    SELECT nom INTO groupe_nom
    FROM Groupe
    WHERE id = NEW.groupeId;

    -- Fetch the new member's name
    SELECT nom INTO etudiant_nom
    FROM Users
    WHERE id = NEW.etudiantId;

    -- Open cursor to loop through all accepted members
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO cur_etudiantId;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert a notification for each accepted member
        INSERT INTO Notification (etudiantId, message, date)
        VALUES (cur_etudiantId, CONCAT('Cher ', (SELECT nom FROM Users WHERE id = cur_etudiantId), ', un nouveau membre (', etudiant_nom, ') a rejoint le groupe: ', groupe_nom, '.'), NOW());
    END LOOP;
    CLOSE cur;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_member_insert_admin_notify` AFTER INSERT ON `Member` FOR EACH ROW BEGIN
    DECLARE admin_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR
        SELECT userId FROM Administrateur;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor to loop through all admins
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO admin_id;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert a notification for each admin
        INSERT INTO Notification (etudiantId, message, date)
        VALUES (admin_id, 'Un nouveau membre a été ajouté à un groupe.', NOW());
    END LOOP;
    CLOSE cur;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Message`
--

CREATE TABLE `Message` (
  `id` int(11) NOT NULL,
  `expId` int(11) DEFAULT NULL,
  `destId` int(11) DEFAULT NULL,
  `contenu` text DEFAULT NULL,
  `dateEnvoi` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Message`
--

INSERT INTO `Message` (`id`, `expId`, `destId`, `contenu`, `dateEnvoi`) VALUES
(2, 1, 3, 'Hello, this is a message!', '2024-12-22 17:54:38');

--
-- Triggers `Message`
--
DELIMITER $$
CREATE TRIGGER `after_message_insert_admin_notify` AFTER INSERT ON `Message` FOR EACH ROW BEGIN
    DECLARE admin_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR
        SELECT userId FROM Administrateur;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor to loop through all admins
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO admin_id;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert a notification for each admin
        INSERT INTO Notification (etudiantId, message, date)
        VALUES (admin_id, 'Un nouveau message a été envoyé.', NOW());
    END LOOP;
    CLOSE cur;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Notification`
--

CREATE TABLE `Notification` (
  `id` int(11) NOT NULL,
  `etudiantId` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Notification`
--

INSERT INTO `Notification` (`id`, `etudiantId`, `message`, `date`) VALUES
(2, 3, 'Notification message here', '2024-12-22 18:14:45'),
(3, 8, 'Votre candidature a été acceptée.', '2024-12-26 18:38:42');

-- --------------------------------------------------------

--
-- Table structure for table `Projet`
--

CREATE TABLE `Projet` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `domaine` varchar(100) DEFAULT NULL,
  `motsCles` text DEFAULT NULL,
  `statut` enum('disponible','en cours','termine') NOT NULL,
  `dateLimit` date DEFAULT NULL,
  `enseignantId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Projet`
--

INSERT INTO `Projet` (`id`, `titre`, `description`, `domaine`, `motsCles`, `statut`, `dateLimit`, `enseignantId`) VALUES
(1, 'AI Project', 'A project focused on the development of AI technologies.', 'Artificial Intelligence', 'AI, Machine Learning', 'disponible', '2024-12-30', 4),
(2, 'AI Research Project', 'A project focused on the research and development of AI technologies.', 'Artificial Intelligence', 'AI, Research, Machine Learning', 'disponible', NULL, 4),
(4, 'Gestion Ventes Project', 'A project focused on the development of Gestion Ventes technologies.', 'Gestion', 'Gestion, Manager, Ventes', 'disponible', NULL, 4);

--
-- Triggers `Projet`
--
DELIMITER $$
CREATE TRIGGER `after_projet_insert_admin_notify` AFTER INSERT ON `Projet` FOR EACH ROW BEGIN
    DECLARE admin_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR
        SELECT userId FROM Administrateur;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor to loop through all admins
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO admin_id;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert a notification for each admin
        INSERT INTO Notification (etudiantId, message, date)
        VALUES (admin_id, 'Un nouveau projet a été créé.', NOW());
    END LOOP;
    CLOSE cur;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Rules`
--

CREATE TABLE `Rules` (
  `id` int(11) NOT NULL,
  `max_projects` int(11) DEFAULT 0,
  `max_groupe_size` int(11) DEFAULT 0,
  `max_candidateur_send` int(11) DEFAULT 0,
  `project_proposal_deadline` date DEFAULT NULL,
  `application_deadline` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Rules`
--

INSERT INTO `Rules` (`id`, `max_projects`, `max_groupe_size`, `max_candidateur_send`, `project_proposal_deadline`, `application_deadline`) VALUES
(1, 3, 0, 0, NULL, NULL);

--
-- Triggers `Rules`
--
DELIMITER $$
CREATE TRIGGER `after_rules_insert_admin_notify` AFTER INSERT ON `Rules` FOR EACH ROW BEGIN
    DECLARE admin_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR
        SELECT userId FROM Administrateur;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor to loop through all admins
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO admin_id;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert a notification for each admin
        INSERT INTO Notification (etudiantId, message, date)
        VALUES (admin_id, 'Les règles ont été mises à jour.', NOW());
    END LOOP;
    CLOSE cur;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `motDePasse` varchar(255) NOT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `domaine` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `typeUtilisateur` enum('Etudiant','Enseignant') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `nom`, `prenom`, `email`, `motDePasse`, `telephone`, `domaine`, `photo`, `typeUtilisateur`) VALUES
(1, 'John', 'Doe', 'test@test.com', '123456', NULL, NULL, NULL, 'Etudiant'),
(3, 'oussama', 'bjm', 'test@gamil.com', '$2b$10$yn0Ehxxyoh5zdLakrnVENe04WrF9RnVw6ajjwUpwFE9cXoTlsksVq', '055544393', 'informatique', 'image.png', 'Etudiant'),
(4, 'Mahmoud', 'Rezzoug', 'teacher@gamil.com', '$2b$10$P3/8y3aWsNsCRJkBBlfnwusE7ZkrRhoAzL6vt6T8JfsqRrGa5bvuq', NULL, NULL, NULL, 'Enseignant'),
(8, NULL, NULL, 'student@test.com', '$2b$10$0RTKsk5FpijRLgF7RAl5dOA/obdzzv3igB8yauXIcEaUEYZrcIx52', NULL, NULL, NULL, 'Etudiant');

--
-- Triggers `Users`
--
DELIMITER $$
CREATE TRIGGER `after_users_insert_admin_notify` AFTER INSERT ON `Users` FOR EACH ROW BEGIN
    DECLARE admin_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur CURSOR FOR
        SELECT userId FROM Administrateur;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    -- Open cursor to loop through all admins
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO admin_id;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Insert a notification for each admin
        INSERT INTO Notification (etudiantId, message, date)
        VALUES (admin_id, 'Un nouvel utilisateur a été créé.', NOW());
    END LOOP;
    CLOSE cur;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Administrateur`
--
ALTER TABLE `Administrateur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Candidature`
--
ALTER TABLE `Candidature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etudiantId` (`etudiantId`),
  ADD KEY `projetId` (`projetId`);

--
-- Indexes for table `Groupe`
--
ALTER TABLE `Groupe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projetId` (`projetId`);

--
-- Indexes for table `Member`
--
ALTER TABLE `Member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupeId` (`groupeId`),
  ADD KEY `etudiantId` (`etudiantId`);

--
-- Indexes for table `Message`
--
ALTER TABLE `Message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expId` (`expId`),
  ADD KEY `destId` (`destId`);

--
-- Indexes for table `Notification`
--
ALTER TABLE `Notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `etudiantId` (`etudiantId`);

--
-- Indexes for table `Projet`
--
ALTER TABLE `Projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_enseignantId` (`enseignantId`);

--
-- Indexes for table `Rules`
--
ALTER TABLE `Rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Administrateur`
--
ALTER TABLE `Administrateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Candidature`
--
ALTER TABLE `Candidature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Groupe`
--
ALTER TABLE `Groupe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Member`
--
ALTER TABLE `Member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Message`
--
ALTER TABLE `Message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Notification`
--
ALTER TABLE `Notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Projet`
--
ALTER TABLE `Projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Rules`
--
ALTER TABLE `Rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Administrateur`
--
ALTER TABLE `Administrateur`
  ADD CONSTRAINT `administrateur_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Candidature`
--
ALTER TABLE `Candidature`
  ADD CONSTRAINT `candidature_ibfk_55` FOREIGN KEY (`etudiantId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `candidature_ibfk_56` FOREIGN KEY (`projetId`) REFERENCES `Projet` (`id`);

--
-- Constraints for table `Groupe`
--
ALTER TABLE `Groupe`
  ADD CONSTRAINT `groupe_ibfk_1` FOREIGN KEY (`projetId`) REFERENCES `Projet` (`id`);

--
-- Constraints for table `Member`
--
ALTER TABLE `Member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`groupeId`) REFERENCES `Groupe` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `member_ibfk_2` FOREIGN KEY (`etudiantId`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Message`
--
ALTER TABLE `Message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`expId`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`destId`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Notification`
--
ALTER TABLE `Notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`etudiantId`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Projet`
--
ALTER TABLE `Projet`
  ADD CONSTRAINT `fk_enseignantId` FOREIGN KEY (`enseignantId`) REFERENCES `Users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
