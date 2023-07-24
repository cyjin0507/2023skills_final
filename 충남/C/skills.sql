-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-24 03:15
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
-- 테이블 구조 `gallery`
--

CREATE TABLE `gallery` (
  `idx` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `file` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `gallery`
--

INSERT INTO `gallery` (`idx`, `name`, `file`) VALUES
(1, '광덕산.jpg', '광덕산.jpg'),
(2, '노은정.jpg', '노은정.jpg'),
(3, '독립기념관.jpg', '독립기념관.jpg'),
(4, '봉서산.jpg', '봉서산.jpg'),
(5, '봉선홍경사갈기비.jpg', '봉선홍경사갈기비.jpg'),
(6, '성거산.jpg', '성거산.jpg'),
(7, '우정박물관.jpg', '우정박물관.jpg'),
(8, '위례산성.jpg', '위례산성.jpg'),
(9, '유관순열사사적지.jpg', '유관순열사사적지.jpg'),
(10, '이동녕선생기념관.jpg', '이동녕선생기념관.jpg'),
(11, '조병옥박사 생가.jpg', '조병옥박사 생가.jpg'),
(12, '조병옥박사생가.jpg', '조병옥박사생가.jpg'),
(13, '천안박물관.jpg', '천안박물관.jpg'),
(14, '천안삼거리공원.jpg', '천안삼거리공원.jpg'),
(15, '천흥사지5층석탑&당간지주.jpg', '천흥사지5층석탑&당간지주.jpg'),
(16, '태조산.jpg', '태조산.jpg'),
(17, '태학산자연휴양림.jpg', '태학산자연휴양림.jpg'),
(18, '흑성산.jpg', '흑성산.jpg');

-- --------------------------------------------------------

--
-- 테이블 구조 `recommand`
--

CREATE TABLE `recommand` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `recommand` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `recommand`
--

INSERT INTO `recommand` (`idx`, `uidx`, `uid`, `recommand`) VALUES
(8, 4, 'admin', '[{\"rank\":\"1\",\"name\":\"각원사\"},{\"rank\":\"2\",\"name\":\"광덕사\"},{\"rank\":\"3\",\"name\":\"산사현대시100년관\"},{\"rank\":\"4\",\"name\":\"아라리오조각광장\"},{\"rank\":\"5\",\"name\":\"자연누리성\"}]'),
(9, 4, 'admin', '[{\"rank\":\"1\",\"name\":\"자연누리성\"},{\"rank\":\"2\",\"name\":\"천안박물관\"},{\"rank\":\"3\",\"name\":\"홍대용과학관\"},{\"rank\":\"4\",\"name\":\"택학산자연휴양림\"},{\"rank\":\"5\",\"name\":\"산사현대시100년관\"}]'),
(10, 4, 'admin', '[{\"rank\":\"1\",\"name\":\"홍대용과학관\"},{\"rank\":\"2\",\"name\":\"중앙시장\"},{\"rank\":\"3\",\"name\":\"산사현대시100년관\"},{\"rank\":\"4\",\"name\":\"택학산자연휴양림\"},{\"rank\":\"5\",\"name\":\"아라리오조각광장\"}]'),
(11, 4, 'admin', '[{\"rank\":\"1\",\"name\":\"홍대용과학관\"},{\"rank\":\"2\",\"name\":\"자연누리성\"},{\"rank\":\"3\",\"name\":\"천안박물관\"},{\"rank\":\"4\",\"name\":\"택학산자연휴양림\"},{\"rank\":\"5\",\"name\":\"중앙시장\"}]'),
(16, 1, 'test', '[{\"rank\":\"1\",\"name\":\"홍대용과학관\"},{\"rank\":\"2\",\"name\":\"각원사\"},{\"rank\":\"3\",\"name\":\"산사현대시100년관\"},{\"rank\":\"4\",\"name\":\"자연누리성\"},{\"rank\":\"5\",\"name\":\"중앙시장\"}]');

-- --------------------------------------------------------

--
-- 테이블 구조 `stats`
--

CREATE TABLE `stats` (
  `idx` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `count` int(11) NOT NULL DEFAULT 0,
  `score` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `stats`
--

INSERT INTO `stats` (`idx`, `name`, `count`, `score`) VALUES
(1, '각원사', 2, 9),
(2, '광덕사', 1, 4),
(3, '산사현대시100년관', 5, 11),
(4, '아라리오조각광장', 2, 3),
(5, '자연누리성', 5, 17),
(6, '중앙시장', 6, 15),
(7, '천안박물관', 6, 18),
(8, '천안삼거리공원', 3, 14),
(9, '택학산자연휴양림', 7, 13),
(10, '홍대용과학관', 8, 31);

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `idx` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `addr` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`idx`, `id`, `password`, `name`, `tel`, `addr`) VALUES
(1, 'test', '1234', '최영진', '010-2222-2222', '용인시 수지구'),
(2, 'aaa', '1234', '최영진', '010-1212-1212', '용인'),
(4, 'admin', '1234', '관리자', '000-0000-0000', '천안');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `recommand`
--
ALTER TABLE `recommand`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `stats`
--
ALTER TABLE `stats`
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
-- 테이블의 AUTO_INCREMENT `gallery`
--
ALTER TABLE `gallery`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- 테이블의 AUTO_INCREMENT `recommand`
--
ALTER TABLE `recommand`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 테이블의 AUTO_INCREMENT `stats`
--
ALTER TABLE `stats`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
