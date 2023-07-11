-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-11 12:39
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
(12, 4, 'admin', '[{\"rank\":\"1\",\"name\":\"천안삼거리공원\"},{\"rank\":\"2\",\"name\":\"홍대용과학관\"},{\"rank\":\"3\",\"name\":\"중앙시장\"},{\"rank\":\"4\",\"name\":\"택학산자연휴양림\"},{\"rank\":\"5\",\"name\":\"천안박물관\"}]'),
(13, 4, 'admin', '[{\"rank\":\"1\",\"name\":\"천안삼거리공원\"},{\"rank\":\"2\",\"name\":\"홍대용과학관\"},{\"rank\":\"3\",\"name\":\"중앙시장\"},{\"rank\":\"4\",\"name\":\"택학산자연휴양림\"},{\"rank\":\"5\",\"name\":\"천안박물관\"}]'),
(14, 4, 'admin', '[{\"rank\":\"1\",\"name\":\"천안박물관\"},{\"rank\":\"2\",\"name\":\"천안삼거리공원\"},{\"rank\":\"3\",\"name\":\"중앙시장\"},{\"rank\":\"4\",\"name\":\"홍대용과학관\"},{\"rank\":\"5\",\"name\":\"택학산자연휴양림\"}]'),
(15, 4, 'admin', '[{\"rank\":\"1\",\"name\":\"자연누리성\"},{\"rank\":\"2\",\"name\":\"천안박물관\"},{\"rank\":\"3\",\"name\":\"홍대용과학관\"},{\"rank\":\"4\",\"name\":\"택학산자연휴양림\"},{\"rank\":\"5\",\"name\":\"산사현대시100년관\"}]');

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
(1, '각원사', 1, 5),
(2, '광덕사', 1, 4),
(3, '산사현대시100년관', 4, 8),
(4, '아라리오조각광장', 2, 3),
(5, '자연누리성', 4, 15),
(6, '중앙시장', 5, 14),
(7, '천안박물관', 6, 18),
(8, '천안삼거리공원', 3, 14),
(9, '택학산자연휴양림', 7, 13),
(10, '홍대용과학관', 7, 26);

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
-- 테이블의 AUTO_INCREMENT `recommand`
--
ALTER TABLE `recommand`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
