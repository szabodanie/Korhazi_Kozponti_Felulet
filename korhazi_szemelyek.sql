-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Okt 06. 16:23
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `korhazi adatok`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `korhazi_szemelyek`
--

CREATE TABLE `korhazi_szemelyek` (
  `id` int(8) DEFAULT NULL,
  `vezeteknev` varchar(50) DEFAULT NULL,
  `keresztnev` varchar(50) DEFAULT NULL,
  `panasz` varchar(255) DEFAULT NULL,
  `orvos` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `korhazi_szemelyek`
--

INSERT INTO `korhazi_szemelyek` (`id`, `vezeteknev`, `keresztnev`, `panasz`, `orvos`) VALUES
(12345678, 'Nagy', 'László', 'izületi fájdalom', 'Dr. Fazekas Jenő'),
(23456789, 'Kiss', 'István', 'tifusz', 'Dr. Fazekas Jenő'),
(34567890, 'Juhász', 'Ernő', 'izületi fájdalom', 'Dr. Fazekas Jenő'),
(45678901, 'Nyenyestyán', 'Géza', 'tumor', 'Dr. Balogh Kiara'),
(56789012, 'Szabó', 'Magda', 'törött csont', 'Dr. Kalmár Ernő'),
(67890123, 'Elek', 'Elemér', 'himlő', 'Dr. Veres Attila'),
(78901234, 'Csontos', 'Márton', 'himlő', 'Dr. Veres Attila'),
(89012345, 'Lakatos', 'Imre', 'tumor', 'Dr. Balogh Kiara');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
