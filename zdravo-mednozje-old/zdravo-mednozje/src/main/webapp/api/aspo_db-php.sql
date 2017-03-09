-- phpMyAdmin SQL Dump
-- version 4.2.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 06, 2015 at 02:08 PM
-- Server version: 5.6.17-log
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `aspo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `dependencies`
--

CREATE TABLE IF NOT EXISTS `dependencies` (
  `answer_id` int(11) NOT NULL,
  `prev_question_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dependencies`
--

INSERT INTO `dependencies` (`answer_id`, `prev_question_id`, `question_id`) VALUES
(0, 0, 1),
(0, 0, 2),
(0, 0, 3),
(0, 0, 15),
(0, 16, 18),
(0, 18, 20),
(0, 20, 22),
(0, 22, 24),
(0, 24, 26),
(0, 26, 28),
(9, 3, 4),
(9, 3, 5),
(9, 3, 6),
(9, 3, 7),
(9, 3, 8),
(9, 3, 9),
(9, 3, 11),
(9, 3, 12),
(9, 3, 13),
(9, 3, 14),
(9, -3, 16),
(41, 14, 30),
(43, -15, 16),
(45, 16, 17),
(51, 18, 19),
(56, 20, 21),
(63, 22, 23),
(70, 24, 25),
(75, 26, 27),
(81, 28, 29),
(100, -1, 10);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
`question_id` int(11) NOT NULL,
  `text` text CHARACTER SET utf8,
  `order_nr` int(11) DEFAULT NULL,
  `type` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=31 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `text`, `order_nr`, `type`) VALUES
(1, 'Spol?', 1000, 1),
(2, 'Starost?', 1100, 1),
(3, 'Ali ste že kdaj imeli spolne odnose (genitalne, oralne, analne)?', 1200, 1),
(4, 'Ali imate stalnega partnerja/partnerko?', 1300, 1),
(5, 'Število spolnih partnerjev/partnerk v zadnjem letu?', 1400, 1),
(6, 'Ali ste imeli v zadnjih 3 mesecih novega spolnega partnerja/partnerko?', 1500, 1),
(7, 'Kakšnega spola so osebe, s katerimi ste imeli spolne odnose?', 1600, 1),
(8, 'Kakšen vrste spolnega odnosa ste imeli (možnih je več izbir)?', 1700, 2),
(9, 'Ali ste pri spolnih odnosih (genitalni, oralni, analni) VEDNO in pravilno uporabljali kondom?', 1800, 1),
(10, 'Ali ste noseči?', 1900, 1),
(11, 'Ali ste imeli spolne odnose z osebo, ki pogosto menja spolne partnerje/partnerke?', 2000, 1),
(12, 'Ali ste imeli spolne odnose z osebo, ki uživa droge?', 2100, 1),
(13, 'Ali ste imeli spolne odnose z osebo, ki je imela znake spolno prenosljive okužbe (izcedek iz spolovila/izpuščaj ali ranica v predelu spolovila) ?', 2200, 1),
(14, 'Ali ste že kdaj imeli / ali imate katero od spolno prenosljivih okužb?', 2300, 1),
(15, 'Ali uživate droge (njuhate, vbrizgavate)?', 2400, 1),
(16, 'Ali imate izcedek iz spolovila?', 2500, 1),
(17, 'Kakšnega?', 2600, 2),
(18, 'Ali ste opazili težave pri uriniranju?', 2700, 1),
(19, 'Kakšne?', 2800, 2),
(20, 'Ali ste opazili spremembe na spolovilu?', 2900, 1),
(21, 'Kakšne?', 3000, 2),
(22, 'Ali ste opazili spremembe na zadnjiku (anusu)?', 3100, 1),
(23, 'Kakšne', 3200, 2),
(24, 'Ali ste opazili spremembe v ustni votlini?', 3300, 1),
(25, 'Kakšne?', 3400, 2),
(26, 'Ali imate bolečine?', 3500, 1),
(27, 'Kakšne?', 3600, 2),
(28, 'Ali imate druge bolezenske znake?', 3700, 1),
(29, 'Kakšne?', 3800, 2),
(30, 'Katero?', 2350, 2);

-- --------------------------------------------------------

--
-- Table structure for table `question_answers`
--

CREATE TABLE IF NOT EXISTS `question_answers` (
`answer_id` int(11) NOT NULL,
  `text` text CHARACTER SET utf8,
  `flag` int(11) DEFAULT NULL,
  `order_nr` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=102 ;

--
-- Dumping data for table `question_answers`
--

INSERT INTO `question_answers` (`answer_id`, `text`, `flag`, `order_nr`, `question_id`) VALUES
(1, 'Moški', 0, 10, 1),
(2, 'Ženski', 0, 20, 1),
(3, '<16', 0, 10, 2),
(4, '16-24', 0, 20, 2),
(5, '25-34', 0, 30, 2),
(6, '35-44', 0, 40, 2),
(7, '45-59', 0, 50, 2),
(8, '59<', 0, 60, 2),
(9, 'Da', 0, 10, 3),
(10, 'Ne', 0, 20, 3),
(11, 'Da', 1, 10, 4),
(12, 'Ne', 2, 20, 4),
(13, '1', 1, 10, 5),
(14, '2', 2, 20, 5),
(15, '3', 4, 30, 5),
(16, '4', 4, 40, 5),
(17, '5', 4, 50, 5),
(18, '6 ali več', 4, 60, 5),
(19, 'Da', 2, 10, 6),
(20, 'Ne', 1, 20, 6),
(21, 'Ženske', 1, 10, 7),
(22, 'Moški', 2, 20, 7),
(23, 'Oboje', 2, 30, 7),
(24, 'Genitalni', 1, 10, 8),
(25, 'Oralni', 1, 20, 8),
(26, 'Analni', 1, 30, 8),
(27, 'Da', 1, 10, 9),
(28, 'Ne', 8, 20, 9),
(29, 'Da', 8, 10, 10),
(30, 'Ne', 1, 20, 10),
(31, 'Ne vem', 1, 30, 10),
(32, 'Da', 4, 10, 11),
(33, 'Ne', 1, 20, 11),
(34, 'Ne vem', 2, 30, 11),
(35, 'Da', 8, 10, 12),
(36, 'Ne', 1, 20, 12),
(37, 'Ne vem', 2, 30, 12),
(38, 'Da', 4, 10, 13),
(39, 'Ne', 2, 20, 13),
(40, 'Ne vem', 2, 30, 13),
(41, 'Da', 8, 10, 14),
(42, 'Ne', 1, 20, 14),
(43, 'Da', 8, 10, 15),
(44, 'Ne', 1, 20, 15),
(45, 'Da', 4, 10, 16),
(46, 'Ne', 1, 20, 16),
(47, 'prozoren', 0, 10, 17),
(48, 'belkast', 0, 20, 17),
(49, 'gnojen', 0, 30, 17),
(50, 'bel sirast', 0, 40, 17),
(51, 'Da', 4, 10, 18),
(52, 'Ne', 1, 20, 18),
(53, 'Pekoče uriniranje', 0, 10, 19),
(54, 'pogosto uriniranje', 0, 20, 19),
(55, 'pogosto me sili na uriniranje', 0, 30, 19),
(56, 'Da', 4, 10, 20),
(57, 'Ne', 1, 20, 20),
(59, 'izpuščaj', 0, 10, 21),
(60, 'mehurček', 0, 20, 21),
(61, 'ranica', 0, 30, 21),
(62, 'bradavica', 0, 40, 21),
(63, 'Da', 4, 10, 22),
(64, 'Ne', 1, 20, 22),
(65, 'srbečica', 0, 10, 23),
(67, 'mehurček', 0, 20, 23),
(68, 'ranica', 0, 30, 23),
(69, 'bradavica', 0, 40, 23),
(70, 'Da', 4, 10, 24),
(71, 'Ne', 1, 20, 24),
(72, 'razjeda', 0, 10, 25),
(73, 'obloge po sluznici', 0, 20, 25),
(75, 'Da', 2, 10, 26),
(76, 'Ne', 1, 20, 26),
(77, 'spolovilo', 0, 10, 27),
(78, 'zadnjik', 0, 20, 27),
(79, 'žrelo', 0, 30, 27),
(80, 'spodnjih del trebuha', 0, 40, 27),
(81, 'Da', 2, 10, 28),
(82, 'Ne', 1, 20, 28),
(83, 'vročina', 0, 10, 29),
(84, 'glavobol', 0, 20, 29),
(85, 'splošno slabo počutje', 0, 30, 29),
(86, 'povečane bezgavke', 0, 40, 29),
(88, 'Gonoreja', 0, 10, 30),
(89, 'Klamidijska okužba', 0, 20, 30),
(90, 'Trihomonoza', 0, 30, 30),
(91, 'Sifilis', 0, 40, 30),
(92, 'Geniralni herpes', 0, 50, 30),
(93, 'Genitalne bradavice', 0, 60, 30),
(94, 'Hepatitis B', 0, 70, 30),
(95, 'Hepatitis C', 0, 80, 30),
(96, 'HIV/aids', 0, 90, 30),
(100, 'bolečine v mišicah in sklepih', 0, 60, 29),
(101, 'zlatenica', 0, 50, 29);

-- --------------------------------------------------------

--
-- Table structure for table `user_answers`
--

CREATE TABLE IF NOT EXISTS `user_answers` (
  `user_id` char(23) COLLATE utf8_unicode_ci NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `answer_id` int(11) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_answers`
--

-- Indexes for dumped tables
--

--
-- Indexes for table `dependencies`
--
ALTER TABLE `dependencies`
 ADD PRIMARY KEY (`answer_id`,`question_id`,`prev_question_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
 ADD PRIMARY KEY (`question_id`), ADD UNIQUE KEY `order_nr_UNIQUE` (`order_nr`);

--
-- Indexes for table `question_answers`
--
ALTER TABLE `question_answers`
 ADD PRIMARY KEY (`answer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `question_answers`
--
ALTER TABLE `question_answers`
MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=102;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
