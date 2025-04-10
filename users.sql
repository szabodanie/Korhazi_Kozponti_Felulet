-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 09. 08:34
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
-- Adatbázis: `korhaz`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` enum('user','admin') NOT NULL DEFAULT 'user',
  `Email` varchar(255) DEFAULT NULL,
  `Specialty` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`Id`, `Username`, `Password`, `Role`, `Email`, `Specialty`) VALUES
(1, 'Kiss László', 'laci2234', 'user', 'kisslaci6@gmail.com', NULL),
(2, 'Dr.Hurok  Attila', 'ati78', 'admin', 'hattila4@gmail.com', 'nőgyógyász'),
(3, 'Kiss János', 'Jani12', 'user', 'kissjani56@gmail.com', ''),
(4, 'Arany János', 'Arany71', 'user', 'jani79@gmail.com', NULL),
(5, 'Lakatos Lali', 'Lali78', 'user', 'Lali6@gmail.com', NULL),
(6, 'Dr.Nagy Gusztáv', 'Guszi12', 'admin', 'Guszti8@gmail.com', 'Szemorvos'),
(7, 'puszta gazsi', 'gazsi67', 'user', 'gazsi6@gmail.com', NULL),
(8, 'Dr.Kalmár Benedek', 'beni76', 'admin', 'kbeni9@gmail.com', 'szemész'),
(9, 'Bukta Elemér', 'buktae45', 'user', 'buktae@gmail.com', NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
