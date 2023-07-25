-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-25 04:12
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
-- 테이블 구조 `reservation`
--

CREATE TABLE `reservation` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `cidx` varchar(100) NOT NULL,
  `term` int(11) NOT NULL COMMENT '1 : 1박2일\r\n2 : 2박 3일\r\n3 : 3박 4일',
  `reserv_date` date NOT NULL,
  `people` int(11) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `applicant` varchar(100) NOT NULL,
  `car` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `reservation`
--

INSERT INTO `reservation` (`idx`, `uidx`, `cidx`, `term`, `reserv_date`, `people`, `phone`, `applicant`, `car`) VALUES
(1, 1, 'a1', 1, '2023-07-10', 2, '010-1234-1234', '최영진', '12다1234'),
(2, 1, 'a1', 1, '2023-07-25', 3, '000-0000-0000', '최영진', '12다1234'),
(4, 1, 'b11', 1, '2023-07-25', 2, '010-1234-1234', '최영진', '12다1234'),
(5, 1, 'a9', 1, '2023-07-19', 6, '010-1234-1234', '최영진', '12다1234'),
(6, 1, 'a10', 1, '2023-07-06', 2, '010-1234-1234', '최영진', '12다1234'),
(7, 3, 'a14', 2, '2023-07-25', 3, '010-1234-1234', '홍길동', '15가2351'),
(8, 3, 'a9', 1, '2023-07-20', 4, '010-1234-1234', '홍길동', '15가2351');

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `idx` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`idx`, `email`, `password`, `name`, `tel`) VALUES
(1, 'cyjin0507@gmail.com', '1234', '최영진', '01092917876'),
(2, 'admin', '1234', '관리자', '01000000000'),
(3, 'abc1234@gmail.com', '1234', '최영진', '010-1211-1212');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `reservation`
--
ALTER TABLE `reservation`
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
-- 테이블의 AUTO_INCREMENT `reservation`
--
ALTER TABLE `reservation`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
