-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-14 06:54
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
-- 테이블 구조 `acco`
--

CREATE TABLE `acco` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `loc` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `acco`
--

INSERT INTO `acco` (`idx`, `uidx`, `name`, `image`, `loc`, `type`, `create_date`) VALUES
(1, 2, '숙박업소1', '7365130381i66g2224orqk9u81FB7B.jpg', '{\"x\":445,\"y\":18.40625}', 'type1', '2023-07-13');

-- --------------------------------------------------------

--
-- 테이블 구조 `comment`
--

CREATE TABLE `comment` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `ridx` int(11) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `comment`
--

INSERT INTO `comment` (`idx`, `uidx`, `ridx`, `comment`, `create_date`) VALUES
(1, 2, 3, '하하하하', '2023-07-14'),
(2, 2, 3, '호호호호호', '2023-07-14');

-- --------------------------------------------------------

--
-- 테이블 구조 `mileage`
--

CREATE TABLE `mileage` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `grade` varchar(100) NOT NULL,
  `score` int(11) NOT NULL,
  `update_date` date NOT NULL COMMENT '최근 리뷰 작성일자',
  `change_date` date NOT NULL COMMENT '마일리지 변경 일자'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `mileage`
--

INSERT INTO `mileage` (`idx`, `uidx`, `grade`, `score`, `update_date`, `change_date`) VALUES
(1, 2, '브론즈', 0, '2023-07-14', '2023-07-14'),
(2, 1, '브론즈', 0, '2023-07-14', '2023-07-14'),
(3, 3, '실버', 11, '2023-06-06', '2023-07-14');

-- --------------------------------------------------------

--
-- 테이블 구조 `reservation`
--

CREATE TABLE `reservation` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `ridx` int(11) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `reservation`
--

INSERT INTO `reservation` (`idx`, `uidx`, `ridx`, `start`, `end`, `create_date`) VALUES
(1, 2, 1, '2023-07-13', '2023-07-25', '0000-00-00'),
(2, 2, 1, '2023-08-23', '2023-09-06', '0000-00-00'),
(4, 2, 1, '2023-07-26', '2023-07-28', '0000-00-00'),
(5, 2, 1, '2023-07-26', '2023-07-29', '0000-00-00'),
(6, 2, 1, '2023-07-26', '2023-07-30', '0000-00-00'),
(7, 2, 1, '2023-07-11', '2023-07-13', '2023-07-14'),
(8, 3, 2, '2023-07-15', '2023-07-17', '2023-07-14'),
(9, 3, 2, '2023-07-11', '2023-07-13', '2023-07-14');

-- --------------------------------------------------------

--
-- 테이블 구조 `review`
--

CREATE TABLE `review` (
  `idx` int(11) NOT NULL,
  `reservIdx` int(11) NOT NULL,
  `roomIdx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  `image` varchar(150) NOT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `review`
--

INSERT INTO `review` (`idx`, `reservIdx`, `roomIdx`, `uidx`, `grade`, `content`, `image`, `create_date`) VALUES
(3, 7, 1, 2, 4, 'good!!', '1623480005github.com_cyjin0507_sanatorium_settings.png', '2023-07-14'),
(6, 9, 2, 3, 5, '나이스', '', '2023-07-14');

-- --------------------------------------------------------

--
-- 테이블 구조 `room`
--

CREATE TABLE `room` (
  `idx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `aidx` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `images` varchar(350) NOT NULL,
  `price` varchar(100) NOT NULL,
  `introduce` varchar(100) NOT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `room`
--

INSERT INTO `room` (`idx`, `uidx`, `aidx`, `name`, `images`, `price`, `introduce`, `create_date`) VALUES
(1, 2, 1, '객실1', '[\"12048381603.png\",\"19081892112.png\",\"1156459741.png\"]', '12000', '객실설명임객실설명임객실설명임객실설명임', '2023-07-13'),
(2, 2, 1, '객실2', '[\"19415535152.png\"]', '23000', '객실객실객실객실객실객실', '2023-07-13');

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
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`idx`, `id`, `password`, `name`, `tel`, `type`) VALUES
(1, 'admin', '1234', '관리자', '010-0000-0000', 'boss'),
(2, 'aaa', '1234', '유저1', '010-2323-2323', 'boss'),
(3, 'bbb', '1234', '최영진', '010-2323-2323', 'normal');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `acco`
--
ALTER TABLE `acco`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `mileage`
--
ALTER TABLE `mileage`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `room`
--
ALTER TABLE `room`
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
-- 테이블의 AUTO_INCREMENT `acco`
--
ALTER TABLE `acco`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 테이블의 AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 테이블의 AUTO_INCREMENT `mileage`
--
ALTER TABLE `mileage`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 테이블의 AUTO_INCREMENT `reservation`
--
ALTER TABLE `reservation`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 테이블의 AUTO_INCREMENT `review`
--
ALTER TABLE `review`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 테이블의 AUTO_INCREMENT `room`
--
ALTER TABLE `room`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
