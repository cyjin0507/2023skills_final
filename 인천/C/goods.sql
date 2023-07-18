-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-18 04:26
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
-- 테이블 구조 `goods`
--

CREATE TABLE `goods` (
  `idx` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `stock` int(11) NOT NULL,
  `img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `goods`
--

INSERT INTO `goods` (`idx`, `name`, `unit`, `price`, `stock`, `img`) VALUES
(1, '원조 호두과자', '300g', '3,000원', 500, '원조 호두과자.png'),
(2, '원조 호두과자', '600g', '5,000원', 300, '원조 호두과자.png'),
(3, '원조 호두과자', '1kg', '9,000원', 100, '원조 호두과자.png'),
(4, '앙버터 호두과자', '300g', '4,000원', 500, '앙버터 호두과자.png'),
(5, '앙버터 호두과자', '600g', '7,000원', 500, '앙버터 호두과자.png'),
(6, '앙버터 호두과자', '1kg', '12,000원', 500, '앙버터 호두과자.png'),
(7, '입장거봉', '2kg', '20,000원', 300, '입장 거봉.png'),
(8, '입장거봉', '4kg', '38,000원', 300, '입장 거봉.png'),
(9, '입장거봉', '10kg', '80,000원', 200, '입장 거봉.png'),
(10, '수신메론', '5kg', '29,900원', 200, '수신 멜론.png'),
(11, '수신메론', '6kg', '36,000원', 200, '수신 멜론.png'),
(12, '수신메론', '8kg', '44,500원', 100, '수신 멜론.png'),
(13, '병천오이', '10개입', '14,900원', 500, '병천 오이.png'),
(14, '병천오이', '99개입', '99,900원', 300, '병천 오이.png'),
(15, '병천 명품 오이(선물용)', '21개입', '29,900원', 100, '병천 오이.png'),
(16, '성환신고배(중과, 11~13수)', '7.5kg', '32,500원', 200, '성환신고배.png'),
(17, '성환신고배(대과, 8~10수)', '7.5kg', '41,500원', 200, '성환신고배.png'),
(18, '광덕 호두', '1kg', '30,000원', 100, '광덛 호두.png');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`idx`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
