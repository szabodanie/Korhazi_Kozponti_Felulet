-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 09. 12:17
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `korhaz`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `korhazi_szemelyek`
--

CREATE TABLE `korhazi_szemelyek` (
  `id` int(11) NOT NULL,
  `vezeteknev` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `keresztnev` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `panasz` varchar(255) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `email` text COLLATE utf8_hungarian_ci NOT NULL,
  `felhasznalonev` text COLLATE utf8_hungarian_ci NOT NULL,
  `tbkartya` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `korhazi_szemelyek`
--

INSERT INTO `korhazi_szemelyek` (`id`, `vezeteknev`, `keresztnev`, `panasz`, `email`, `felhasznalonev`, `tbkartya`) VALUES
(12345678, 'Nagy', 'László', 'izületi fájdalom\r\n', 'nagylaszlo1@gmail.com', 'Nagy László', '112345'),
(23456789, 'Kiss', 'István', 'tifusz', 'kissistvan2@gmail.com', 'Kiss István', '12345'),
(34567890, 'Juhász', 'Ernő', 'izületi fájdalom\r\n', 'juhaszerno3@gmail.com', 'Juhász Ernő', '2134'),
(45678901, 'Nyenyestyán', 'Géza', 'tumor', 'nyenyigeza4@gmail.com', 'Nyenyestyán Géza', '2345345'),
(56789012, 'Szabó', 'Magda', 'törött csont', 'szabomagda@gmail.com', 'Szabó Magda', '764374'),
(67890123, 'Elek', 'Elemér', 'himlő', 'elekelemer@gmail.com', 'himlő', '122344');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
