-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-28 05:34
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
-- 테이블 구조 `place`
--

CREATE TABLE `place` (
  `idx` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `distance` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `place`
--

INSERT INTO `place` (`idx`, `title`, `distance`) VALUES
(1, '각원사', '7.7'),
(2, '오션어드벤처 천안', '11.7'),
(3, '독립기념관', '10.4'),
(4, '우정박물관', '6.7'),
(5, '천안종합운동장', '0.4'),
(6, '광덕사', '17'),
(7, '성불사', '11.2'),
(8, '유관순기념관', '18.3'),
(9, '천안상록아쿠아피아', '17.6'),
(10, '천안시 홍대용과학관', '18.3'),
(11, '아름다운정원 화수목', '7.9'),
(12, '평화의 소녀상', '11.3'),
(13, '천흥사', '10.7'),
(14, '평화의 소녀상', '4'),
(15, '법왕사', '10.6'),
(16, '어사 박문수묘', '15.1'),
(17, '장재천', '1.3'),
(18, '유림당 미술관', '14'),
(19, '한민족역사문화공원', '8.7');

-- --------------------------------------------------------

--
-- 테이블 구조 `review`
--

CREATE TABLE `review` (
  `idx` int(11) NOT NULL,
  `pidx` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `score` int(11) NOT NULL,
  `content` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `review`
--

INSERT INTO `review` (`idx`, `pidx`, `title`, `date`, `score`, `content`) VALUES
(5, 3, '독립기념관', '2023-07-12', 3, 'fsd');

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `idx` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`idx`, `id`, `password`, `name`) VALUES
(1, 'admin', '1234', '관리자');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `review`
--
ALTER TABLE `review`
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
-- 테이블의 AUTO_INCREMENT `place`
--
ALTER TABLE `place`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 테이블의 AUTO_INCREMENT `review`
--
ALTER TABLE `review`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
