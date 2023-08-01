-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-08-01 09:43
-- 서버 버전: 10.4.24-MariaDB
-- PHP 버전: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `skills`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `bus`
--

CREATE TABLE `bus` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `accept` int(11) NOT NULL DEFAULT 0 COMMENT '0 : 기본 상태\r\n1 : 요청\r\n2 : 수락\r\n3 : 거절',
  `type` varchar(100) NOT NULL,
  `start` varchar(100) NOT NULL,
  `middle` varchar(100) NOT NULL,
  `end` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `number` int(11) NOT NULL,
  `begin` varchar(100) NOT NULL,
  `seat` varchar(250) NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `bus`
--

INSERT INTO `bus` (`idx`, `uidx`, `accept`, `type`, `start`, `middle`, `end`, `image`, `number`, `begin`, `seat`, `date`, `time`) VALUES
(6, 3, 2, '승용차', '천안역', '유관순사적지', '독립기념관', '7715337961690866876캡처.JPG', 1253, '천안역', '{\"A01\":false,\"A02\":true,\"A03\":false}', '2023-08-08', '16:27:00'),
(7, 3, 0, '버스', '천안역', '유관순사적지', '독립기념관', '8447848231690866953다운로드 (1).png', 6342, '유관순사적지', '{\"D01\":false,\"D02\":false,\"D03\":false,\"D04\":false,\"D05\":false,\"D06\":false,\"D07\":true,\"D08\":false,\"D09\":false,\"D10\":false,\"D11\":false,\"D12\":true}', NULL, NULL),
(8, 3, 1, 'SUV', '천안역', '유관순사적지', '독립기념관', '115142496716908673182.png', 6345, '독립기념관', '{\"B01\":false,\"B02\":false,\"B03\":false,\"B04\":false,\"B05\":false}', NULL, NULL);

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `idx` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `birth` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`idx`, `id`, `password`, `birth`, `phone`, `type`) VALUES
(1, 'user', '1234', '2005년05월07일', '010-1234-1234', '0'),
(2, 'admin', '1234', '0000년00월00일', '000-0000-0000', 'admin'),
(3, 'tourlist', '1234', '2000년00월00일', '010-1122-3344', '1');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `bus`
--
ALTER TABLE `bus`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `bus`
--
ALTER TABLE `bus`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
