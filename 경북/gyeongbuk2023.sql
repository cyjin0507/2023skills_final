-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-15 17:32
-- 서버 버전: 10.4.11-MariaDB
-- PHP 버전: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `gyeongbuk2023`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `game`
--

CREATE TABLE `game` (
  `idx` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `count` int(200) NOT NULL,
  `time` varchar(200) NOT NULL,
  `date` datetime NOT NULL,
  `game` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `game`
--

INSERT INTO `game` (`idx`, `name`, `count`, `time`, `date`, `game`) VALUES
(20, '관리자', 2, '2:23', '2023-07-14 00:00:00', 0),
(22, '관리자', 0, '2:58', '2023-07-14 00:00:00', 0),
(23, 'adfawefw', 0, '2:53', '2023-07-14 00:00:00', 0),
(24, '관리자', 0, '2:55', '2023-07-15 16:37:28', 1),
(25, 'feefe', 5, '2:34', '2023-07-13 00:00:00', 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `place`
--

CREATE TABLE `place` (
  `idx` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `distance` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `place`
--

INSERT INTO `place` (`idx`, `title`, `distance`, `image`) VALUES
(1, '각원사', '7.7', '/place/1.jpg'),
(2, '오션어드벤처 천안', '11.7', '/place/2.jpg'),
(3, '독립기념관', '10.4', '/place/3.jpg'),
(4, '우정박물관', '6.7', '/place/4.jpg'),
(5, '천안종합운동장', '0.4', '/place/5.jpg'),
(6, '광덕사', '17', '/place/6.jpg'),
(7, '성불사', '11.2', '/place/7.jpg'),
(8, '유관순기념관', '18.3', '/place/8.jpg'),
(9, '천안상록아쿠아피아', '17.6', '/place/9.jpg'),
(10, '천안시 홍대용과학관', '18.3', '/place/10.jpg'),
(11, '아름다운정원 화수목', '7.9', '/place/11.jpg'),
(12, '평화의 소녀상', '11.3', '/place/12.jpg'),
(13, '천흥사', '10.7', '/place/13.jpg'),
(14, '평화의 소녀상', '4', '/place/14.jpg'),
(15, '법왕사', '10.6', '/place/15.jpg'),
(16, '어사 박문수묘', '15.1', '/place/16.jpg'),
(17, '장재천', '1.3', '/place/17.jpg'),
(18, '유림당 미술관', '14', '/place/18.jpg'),
(19, '한민족역사문화공원', '8.7', '/place/19.jpg');

-- --------------------------------------------------------

--
-- 테이블 구조 `review`
--

CREATE TABLE `review` (
  `idx` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `visit` date NOT NULL,
  `rate` float NOT NULL,
  `text` varchar(200) NOT NULL,
  `place` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `review`
--

INSERT INTO `review` (`idx`, `title`, `visit`, `rate`, `text`, `place`) VALUES
(32, '우정박물관', '2023-07-12', 2.4, 'fefe', 4),
(33, '우정박물관', '2023-07-11', 3.2, 'fefe', 4),
(34, '우정박물관', '2023-07-11', 0.2, 'jjhuyhjuy', 4),
(35, '우정박물관', '2023-07-03', 5, 'gtyrt', 4),
(36, '우정박물관', '2023-06-26', 2.5, 'ㅈㄷㅈㄷㄹ', 4),
(38, '우정박물관', '2023-06-26', 5, 'fefe', 4),
(39, '우정박물관', '2023-07-04', 2.6, 'fefe', 4),
(40, '우정박물관', '2023-06-26', 3.4, 'fefe', 4),
(41, '우정박물관', '2023-07-02', 4, 'vgbftftghbbfcg', 4);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`idx`);

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
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `game`
--
ALTER TABLE `game`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- 테이블의 AUTO_INCREMENT `place`
--
ALTER TABLE `place`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- 테이블의 AUTO_INCREMENT `review`
--
ALTER TABLE `review`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
