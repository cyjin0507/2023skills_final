-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-17 09:53
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
-- 데이터베이스: `gwangju2023`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `data`
--

CREATE TABLE `data` (
  `idx` int(200) NOT NULL,
  `product` varchar(200) NOT NULL,
  `price` int(200) NOT NULL,
  `img` varchar(200) NOT NULL,
  `longinfo` varchar(200) NOT NULL,
  `shortinfo` varchar(200) NOT NULL,
  `quantity` int(200) NOT NULL,
  `category` varchar(200) NOT NULL,
  `hit` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `data`
--

INSERT INTO `data` (`idx`, `product`, `price`, `img`, `longinfo`, `shortinfo`, `quantity`, `category`, `hit`) VALUES
(1, '만세소녀 열쇠고리세트', 18500, 'img1', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '만세소녀 열쇠고리세트', 19, '펜시', 55),
(2, '독립운동가 리유저블리컵', 15980, 'img2', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동가 리유저블리컵', 10, '생활용품', 7),
(3, '독립운동 빵', 19500, 'img3', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동 빵', 8, '식품', 10),
(4, '독립운동가 일러스트 스마트톡', 9500, 'img4', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동가 일러스트 스마트톡', 4, '펜시', 21),
(5, '독립운동가 반팔 티셔츠(화이트)', 19000, 'img5', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동가 반팔 티셔츠(화이트)', 3, '의류', 11),
(6, '독립운동 접착식 메모지(태극)', 10000, 'img6', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동 접착식 메모지', 20, '펜시', 9),
(7, '독립운동 메모패드', 3000, 'img7', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동 메모패드', 10, '팬시', 11),
(8, '독립운동 접착식 메모지(팝)', 10900, 'img8', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동 접착식 메모지(팝)', 5, '펜시', 15),
(9, '독립운동기념유공굿즈 머그컵(화이트)', 5000, 'img9', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동기념유공굿즈 머그컵(화이트)', 14, '생활용품', 47),
(10, '독립운동 납작책갈피(소)', 3000, 'img10', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동 납작책갈피(소)', 3, '펜시', 5),
(11, '독립운동 납작책갈피(대)', 5000, 'img11', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동 납작책갈피(대)', 2, '펜시', 8),
(12, '815 콜라(30캔)', 12000, 'img12', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '815 콜라(30캔)', 5, '식품', 26),
(13, '독립운동가 반팔 티셔츠(그레이)', 19000, 'img13', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동가 반팔 티셔츠(그레이)', 7, '의류', 1),
(14, '독립운동가 반팔 티셔츠(블랙)', 19000, 'img14', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동가 반팔 티셔츠(블랙)', 13, '의류', 23),
(15, '815 콜라(60캔)', 20000, 'img15', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '815 콜라(60캔)', 11, '식품', 7),
(16, '독립운동기념유공굿즈 머그컵(퍼플)', 5000, 'img16', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동기념유공굿즈 머그컵(퍼플)', 10, '생활용품', 4),
(17, '독립운동 접착식 메모지(캘리1)', 10000, 'img17', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동 접착식 메모지(캘리1)', 0, '펜시', 50),
(18, '독립운동 접착식 메모지(캘리2)', 10000, 'img18', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동 접착식 메모지(캘리2)', 8, '펜시', 1),
(19, '독립운동기념유공굿즈 머그컵(그린)', 5000, 'img19', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동기념유공굿즈 머그컵(그린)', 9, '생활용품', 10),
(20, '독립운동기념유공굿즈 머그컵(블랙)', 5000, 'img20', '독입운동을 기억하며 유관순열사를 기리면서 만든 쇼핑몰입니다. 좋은 제품으로 독립 후손들을 후원금으로 사용하겠습니다.', '독립운동기념유공굿즈 머그컵(블랙)', 11, '생활용품', 7);

-- --------------------------------------------------------

--
-- 테이블 구조 `member`
--

CREATE TABLE `member` (
  `idx` int(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `id` varchar(200) NOT NULL,
  `pw` varchar(200) NOT NULL,
  `age` int(200) NOT NULL,
  `area` varchar(200) NOT NULL,
  `level` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `member`
--

INSERT INTO `member` (`idx`, `name`, `id`, `pw`, `age`, `area`, `level`) VALUES
(1, '김지민', 'Jimin1', 'jimin12345', 20, '전라북도', '실버'),
(2, '김석진', 'Lacey2', 'lacey12345', 23, '강원도', '브론즈'),
(3, '김윤기', 'Ivana3', 'ivana12345', 34, '경기도', '실버'),
(4, '김호석', 'Jocelyn4', 'jocelyn12345', 45, '충청남도', '브론즈'),
(5, '김태형', 'Isaiah5', 'isaiah12345', 18, '전라북도', 'VIP'),
(6, '김남준', 'zlxl6', 'zlxl12345', 18, '경기도', '골드'),
(7, '김정국', 'Jonas7', 'jonas12345', 43, '경상북도', '브론즈'),
(8, '김지용', 'Ulysses8', 'ulysses12345', 48, '경상남도', '실버'),
(9, '김영배', 'Kermit9', 'Kermit9', 27, '경기도', '골드'),
(10, '김대성', 'William10', 'william12345', 34, '강원도', 'VIP'),
(11, '김지훈', 'Yvonne11', 'yvonne12345', 21, '경상남도', 'VIP'),
(12, '김준면', 'Baker12', 'baker12345', 44, '전라남도', '실버'),
(13, '김백현', 'Brittany13', 'brittany12345', 36, '전라남도', '실버'),
(14, '김종인', 'Serena14', 'serena12345', 20, '강원도', '브론즈'),
(15, '김민석', 'Tanek15', 'tanek12345', 17, '충청남도', '골드'),
(16, '김경수', 'Clark16', 'clark12345', 23, '충청북도', '실버'),
(17, '김종대', 'Marny17', 'marny12345', 21, '전라북도', '브론즈'),
(18, '김이씽', 'Sandra18', 'sandra12345', 19, '경기도', '골드'),
(19, '김세훈', 'Vivien19', 'vivien12345', 22, '강원도', 'VIP'),
(20, '김지호', 'Hannah20', 'hannah12345', 40, '전라북도', '골드'),
(21, '김문복', 'Jameson21', 'jameson12345', 19, '경기도', '브론즈'),
(22, '김은광', 'Lane22', 'lane12345', 22, '강원도', '실버'),
(23, '김민혁', 'Brynne23', 'brynne12345', 42, '충청남도', '골드'),
(24, '김창섭', 'Kennan24', 'kennan12345', 49, '경상북도', 'VIP'),
(25, '김성재', 'Helen25', 'helen12345', 33, '제주도', '실버'),
(26, '김현식', 'Cameron26', 'cameron12345', 18, '제주도', '브론즈'),
(27, '김일훈', 'Audrey27', 'audrey12345', 25, '제주도', '실버'),
(28, '김홍원', 'Gay28', 'gay12345', 28, '경기도', '골드'),
(29, '김효종', 'HAKSAL29', 'haksal12345', 18, '제주도', 'VIP'),
(30, '김선재', 'Brynbu30', 'brynbu12345', 19, '충청남도', '골드'),
(31, '김급천', 'Tooru31', 'tooru12345', 19, '경기도', '실버'),
(32, '김일향', 'Syoyo32', 'syoyo12345', 21, '강원도', '브론즈'),
(33, '김아담', 'AdamSmith33', 'adamsmith12345', 34, '강원도', '실버'),
(34, '김고든', 'Gordon34', 'gordon12345', 38, '경상남도', 'VIP'),
(35, '김은호', 'Neungji35', 'neungji12345', 18, '충청남도', '브론즈');

-- --------------------------------------------------------

--
-- 테이블 구조 `reserve`
--

CREATE TABLE `reserve` (
  `idx` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `product` varchar(200) NOT NULL,
  `state` varchar(200) NOT NULL,
  `rdate` date NOT NULL,
  `quantity` int(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `price` int(200) NOT NULL,
  `saleprice` int(200) NOT NULL,
  `okdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `reserve`
--

INSERT INTO `reserve` (`idx`, `name`, `product`, `state`, `rdate`, `quantity`, `address`, `price`, `saleprice`, `okdate`) VALUES
(1, '김종대', '꽃멸치 젓갈', '구매확정', '2017-05-17', 9, '어디시 어딘가동 어디호', 143820, 136629, '2017-05-18'),
(2, '김이씽', '보석건귤 팩', '구매확정', '2017-05-05', 7, '어디시 어딘가동 어디호', 28000, 22400, '2017-05-06'),
(3, '김지민', '김경숙 해바라기 볶음씨앗(무농약)', '불확정', '2017-05-30', 1, '어디시 어딘가동 어디호', 10000, 9000, '0000-00-00'),
(4, '김영배', '제주 야생화꿀', '불확정', '2017-05-19', 9, '어디시 어딘가동 어디호', 98100, 83385, '0000-00-00'),
(5, '김이씽', '한라봉 초콜릿', '구매확정', '2017-05-15', 5, '어디시 어딘가동 어디호', 24500, 19600, '2017-05-16'),
(6, '김준면', '친환경 표고버섯(동고)', '구매확정', '2017-05-07', 3, '어디시 어딘가동 어디호', 189000, 170100, '2017-05-08'),
(7, '김효종', '제주 유채생꿀', '불확정', '2017-05-23', 1, '어디시 어딘가동 어디호', 10000, 8000, '0000-00-00'),
(8, '김준면', '유기농 가루녹차', '불확정', '2017-05-14', 4, '어디시 어딘가동 어디호', 136000, 122400, '0000-00-00'),
(9, '김지훈', '자리돔 젓갈', '불확정', '2017-05-24', 5, '어디시 어딘가동 어디호', 92500, 74000, '0000-00-00'),
(10, '김윤기', '친환경 표고버섯 채', '구매확정', '2017-05-21', 7, '어디시 어딘가동 어디호', 89600, 80640, '2017-05-22'),
(11, '김종인', '친환경 표고버섯(향고)', '불확정', '2017-05-25', 8, '어디시 어딘가동 어디호', 368000, 349600, '0000-00-00'),
(12, '김경수', '한라봉 초콜릿', '불확정', '2017-05-06', 7, '어디시 어딘가동 어디호', 34300, 30870, '0000-00-00'),
(13, '김민석', '추자도 참톳', '구매확정', '2017-05-18', 10, '어디시 어딘가동 어디호', 75000, 63750, '2017-05-19'),
(14, '김종인', '제주명품 마유', '불확정', '2017-05-10', 7, '어디시 어딘가동 어디호', 301000, 285950, '0000-00-00'),
(15, '김지호', '동백 크림 마스크', '구매확정', '2017-05-12', 5, '어디시 어딘가동 어디호', 225000, 191250, '2017-05-13'),
(16, '김지민', '오늘은 홍차', '구매확정', '2017-05-22', 8, '어디시 어딘가동 어디호', 140000, 126000, '2017-05-23'),
(17, '김정국', '친환경 표고버섯(향고)', '불확정', '2017-05-02', 7, '어디시 어딘가동 어디호', 322000, 305900, '0000-00-00'),
(18, '김호석', '동백 페이스 오일', '불확정', '2017-05-29', 5, '어디시 어딘가동 어디호', 170000, 161500, '0000-00-00'),
(19, '김지용', '제주 야생화꿀', '구매확정', '2017-05-08', 2, '어디시 어딘가동 어디호', 21800, 19620, '2017-05-09'),
(20, '김은광', '유기농 가루녹차', '불확정', '2017-05-11', 5, '어디시 어딘가동 어디호', 170000, 153000, '0000-00-00'),
(21, '김영배', '꽃멸치 젓갈', '불확정', '2017-05-01', 4, '어디시 어딘가동 어디호', 63920, 54332, '0000-00-00'),
(22, '김홍원', 'JEJU KISS 초콜릿', '구매확정', '2017-05-16', 9, '어디시 어딘가동 어디호', 139500, 118575, '2017-05-17'),
(23, '김홍원', '녹차 비누', '구매확정', '2017-05-04', 7, '어디시 어딘가동 어디호', 103600, 88060, '2017-05-05'),
(24, '김성재', '제주명품 마유비누', '구매확정', '2017-05-28', 5, '어디시 어딘가동 어디호', 122500, 110250, '2017-05-29'),
(25, '김일훈', '유기농 홍차', '구매확정', '2017-05-09', 9, '어디시 어딘가동 어디호', 261000, 234900, '2017-05-10'),
(26, '김세훈', '마유 수분크림', '구매확정', '2017-05-26', 1, '어디시 어딘가동 어디호', 37000, 29600, '2017-05-27'),
(27, '김호석', '유기농 영귤과즙', '불확정', '2017-05-13', 1, '어디시 어딘가동 어디호', 9900, 9405, '0000-00-00'),
(28, '김일훈', '김경숙 해바라기 볶음씨앗(무농약)', '불확정', '2017-05-03', 10, '어디시 어딘가동 어디호', 100000, 90000, '0000-00-00'),
(29, '김정국', '노스테 순한 썬블럭', '불확정', '2017-05-27', 2, '어디시 어딘가동 어디호', 37000, 35150, '0000-00-00'),
(30, '김문복', '오늘은 녹차', '구매확정', '2017-05-20', 3, '어디시 어딘가동 어디호', 44700, 42465, '2017-05-21'),
(31, '김홍원', '보석건귤 팩', '불확정', '2017-05-31', 5, '어디시 어딘가동 어디호', 20000, 17000, '0000-00-00'),
(32, '김지훈', '오늘은 녹차', '불확정', '2017-06-06', 10, '어디시 어딘가동 어디호', 149000, 119200, '0000-00-00'),
(33, '김지훈', '추자도 참톳', '불확정', '2017-06-23', 6, '어디시 어딘가동 어디호', 45000, 36000, '0000-00-00'),
(34, '김준면', '유기농 영귤과즙', '불확정', '2017-06-15', 10, '어디시 어딘가동 어디호', 99000, 89100, '0000-00-00'),
(35, '김세훈', '친환경 표고버섯(동고)', '구매확정', '2017-06-27', 8, '어디시 어딘가동 어디호', 504000, 403200, '2017-06-28'),
(36, '김홍원', '제주 토종닭(무항생제)', '불확정', '2017-06-19', 3, '어디시 어딘가동 어디호', 150000, 127500, '0000-00-00'),
(37, '김민석', '친환경 표고버섯 채', '구매확정', '2017-06-16', 10, '어디시 어딘가동 어디호', 128000, 108800, '2017-06-17'),
(38, '김남준', '유기농 가루녹차', '구매확정', '2017-06-08', 9, '어디시 어딘가동 어디호', 306000, 260100, '2017-06-09'),
(39, '김현식', '동백 스크럽 페이스트', '구매확정', '2017-06-22', 4, '어디시 어딘가동 어디호', 106000, 100700, '2017-06-22'),
(40, '김민혁', '자리돔 통 젓갈', '구매확정', '2017-06-13', 4, '어디시 어딘가동 어디호', 78000, 66300, '2017-06-14'),
(41, '김윤기', '유기농 홍차', '불확정', '2017-06-24', 7, '어디시 어딘가동 어디호', 203000, 182700, '0000-00-00'),
(42, '김종대', '제주 야생화꿀', '불확정', '2017-06-01', 2, '어디시 어딘가동 어디호', 21800, 20710, '0000-00-00'),
(43, '김창섭', '유기농 영귤과즙', '구매확정', '2017-06-04', 7, '어디시 어딘가동 어디호', 69300, 55440, '2017-06-05'),
(44, '김일훈', '동백 크림 마스크', '불확정', '2017-06-17', 3, '어디시 어딘가동 어디호', 135000, 121500, '0000-00-00'),
(45, '김효종', '친환경 표고버섯(동고)', '구매확정', '2017-06-02', 5, '어디시 어딘가동 어디호', 315000, 252000, '2017-06-03'),
(46, '김성재', '마유 수분크림', '불확정', '2017-06-21', 7, '어디시 어딘가동 어디호', 259000, 220150, '0000-00-00'),
(47, '김선재', '제주 찰보리빵', '구매확정', '2017-06-14', 6, '어디시 어딘가동 어디호', 81000, 68850, '2017-06-15'),
(48, '김석진', '제주 유채생꿀', '구매확정', '2017-06-28', 6, '어디시 어딘가동 어디호', 60000, 57000, '2023-07-17'),
(49, '김현식', '유기농 가루녹차', '구매확정', '2017-06-20', 4, '어디시 어딘가동 어디호', 136000, 129200, '2017-06-21'),
(50, '김문복', '친환경 표고버섯 채', '구매확정', '2017-06-30', 5, '어디시 어딘가동 어디호', 64000, 60800, '2023-07-17'),
(51, '김경수', '감귤 과즐', '구매확정', '2017-06-18', 7, '어디시 어딘가동 어디호', 129500, 116550, '2017-06-19'),
(52, '김지민', '친환경 표고버섯(향고)', '불확정', '2017-06-09', 7, '어디시 어딘가동 어디호', 322000, 289800, '0000-00-00'),
(53, '김세훈', '유기농 홍차', '구매확정', '2017-06-26', 5, '어디시 어딘가동 어디호', 145000, 116000, '2017-06-27'),
(54, '김정국', '제주 찰보리빵', '불확정', '2017-06-12', 2, '어디시 어딘가동 어디호', 27000, 25650, '0000-00-00'),
(55, '김효종', '동백 스크럽 페이스트', '불확정', '2017-06-05', 6, '어디시 어딘가동 어디호', 159000, 127200, '0000-00-00'),
(56, '김대성', '꽃멸치 젓갈', '불확정', '2017-06-11', 1, '어디시 어딘가동 어디호', 15980, 12784, '0000-00-00'),
(57, '김성재', '제주명품 마유비누', '구매확정', '2017-06-03', 2, '어디시 어딘가동 어디호', 49000, 41650, '2017-06-04'),
(58, '김선재', '제주 유채생꿀', '불확정', '2017-06-25', 7, '어디시 어딘가동 어디호', 70000, 56000, '0000-00-00'),
(59, '김현식', '녹차 비누', '불확정', '2017-06-07', 9, '어디시 어딘가동 어디호', 133200, 126540, '0000-00-00'),
(60, '김대성', '노스테 순한 썬블럭', '구매확정', '2017-06-10', 5, '어디시 어딘가동 어디호', 92500, 74000, '2017-06-11'),
(61, '김백현', '오늘은 홍차', '불확정', '2017-06-29', 8, '어디시 어딘가동 어디호', 140000, 126000, '0000-00-00'),
(62, '김종대', '껍찔째 마시는 감귤주스', '구매확정', '2017-04-06', 9, '어디시 어딘가동 어디호', 94500, 89775, '2017-04-07'),
(63, '김백현', '꽃멸치 젓갈', '구매확정', '2017-04-26', 2, '어디시 어딘가동 어디호', 31960, 28764, '2017-04-27'),
(64, '김민혁', '제주 찰보리빵', '불확정', '2017-04-02', 2, '어디시 어딘가동 어디호', 27000, 22950, '0000-00-00'),
(65, '김경수', '제주 야생화꿀', '구매확정', '2017-04-27', 5, '어디시 어딘가동 어디호', 54500, 49050, '2017-04-28'),
(66, '김지용', '김경숙 해바라기 볶음씨앗(무농약)', '불확정', '2017-04-12', 2, '어디시 어딘가동 어디호', 20000, 18000, '0000-00-00'),
(67, '김은광', '제주 밀감생꿀', '구매확정', '2017-04-17', 2, '어디시 어딘가동 어디호', 29000, 26100, '2017-04-18'),
(68, '김성재', '추자도 참톳', '불확정', '2017-04-24', 7, '어디시 어딘가동 어디호', 52500, 44625, '0000-00-00'),
(69, '김이씽', '친환경 표고버섯(향고)', '불확정', '2017-04-25', 6, '어디시 어딘가동 어디호', 276000, 220800, '0000-00-00'),
(70, '김창섭', '유기농 영귤차', '불확정', '2017-04-20', 2, '어디시 어딘가동 어디호', 29600, 23680, '0000-00-00'),
(71, '김민석', '유기농 영귤과즙', '구매확정', '2017-04-21', 6, '어디시 어딘가동 어디호', 59400, 50490, '2017-04-22'),
(72, '김석진', '제주 밀감생꿀', '불확정', '2017-04-08', 5, '어디시 어딘가동 어디호', 72500, 68875, '0000-00-00'),
(73, '김은광', '제주 밀감생꿀', '불확정', '2017-04-22', 3, '어디시 어딘가동 어디호', 43500, 39150, '0000-00-00'),
(74, '김영배', 'JEJU KISS 초콜릿', '불확정', '2017-04-18', 2, '어디시 어딘가동 어디호', 31000, 26350, '0000-00-00'),
(75, '김일훈', '추자도 참톳', '구매확정', '2017-04-10', 3, '어디시 어딘가동 어디호', 22500, 20250, '2017-04-11'),
(76, '김석진', '노스테 순한 썬블럭', '불확정', '2017-04-13', 2, '어디시 어딘가동 어디호', 37000, 35150, '0000-00-00'),
(77, '김선재', '녹차 비누', '불확정', '2017-04-14', 2, '어디시 어딘가동 어디호', 29600, 25160, '0000-00-00'),
(78, '김지호', '보석건귤 팩', '구매확정', '2017-04-05', 1, '어디시 어딘가동 어디호', 4000, 3400, '2017-04-06'),
(79, '김경수', '동백 스크럽 페이스트', '불확정', '2017-04-07', 1, '어디시 어딘가동 어디호', 26500, 23850, '0000-00-00'),
(80, '김대성', '동백 크림 마스크', '구매확정', '2017-04-01', 9, '어디시 어딘가동 어디호', 405000, 324000, '2017-04-02'),
(81, '김윤기', '오늘은 홍차', '구매확정', '2017-04-03', 1, '어디시 어딘가동 어디호', 17500, 15750, '2017-04-04'),
(82, '김민혁', '자리돔 통 젓갈', '불확정', '2017-04-16', 1, '어디시 어딘가동 어디호', 19500, 16575, '0000-00-00'),
(83, '김문복', '제주 찰보리빵', '구매확정', '2017-04-11', 5, '어디시 어딘가동 어디호', 67500, 64125, '2017-04-12'),
(84, '김민혁', '유기농 영귤차', '불확정', '2017-04-29', 10, '어디시 어딘가동 어디호', 148000, 125800, '0000-00-00'),
(85, '김종인', '제주명품 마유비누', '구매확정', '2017-04-30', 2, '어디시 어딘가동 어디호', 49000, 46550, '2017-05-01'),
(86, '김태형', '보석건귤 팩', '불확정', '2017-04-15', 5, '어디시 어딘가동 어디호', 20000, 16000, '0000-00-00'),
(87, '김지훈', '김경숙 해바라기 볶음씨앗(무농약)', '구매확정', '2017-04-19', 4, '어디시 어딘가동 어디호', 40000, 32000, '2017-04-20'),
(88, '김준면', '오늘은 녹차', '불확정', '2017-04-23', 2, '어디시 어딘가동 어디호', 29800, 26820, '0000-00-00'),
(89, '김대성', '껍찔째 마시는 감귤주스', '구매확정', '2017-04-09', 6, '어디시 어딘가동 어디호', 63000, 50400, '2017-04-10'),
(90, '김태형', '껍찔째 마시는 감귤주스', '구매확정', '2017-04-04', 10, '어디시 어딘가동 어디호', 105000, 84000, '2017-04-05'),
(91, '김남준', '자리돔 젓갈', '구매확정', '2017-04-28', 4, '어디시 어딘가동 어디호', 78000, 66300, '2017-04-29'),
(92, '김호석', '유기농 영귤차', '구매확정', '2017-06-06', 5, '어디시 어딘가동 어디호', 74000, 70300, '2017-06-07'),
(93, '김지호', '한라봉 초콜릿', '불확정', '2017-06-23', 4, '어디시 어딘가동 어디호', 19600, 16600, '0000-00-00'),
(94, '김창섭', '오늘은 녹차', '구매확정', '2017-06-15', 2, '어디시 어딘가동 어디호', 29800, 23840, '2017-06-16'),
(95, '김지민', '유기농 홍차', '구매확정', '2017-06-27', 1, '어디시 어딘가동 어디호', 29000, 26100, '2017-06-28'),
(96, '김은광', '자리돔 젓갈', '불확정', '2017-06-19', 4, '어디시 어딘가동 어디호', 74000, 66600, '0000-00-00'),
(97, '김이씽', '마유 수분크림', '구매확정', '2017-06-16', 3, '어디시 어딘가동 어디호', 129000, 103200, '2017-06-17'),
(98, '김세훈', '친환경 표고버섯(동고)', '불확정', '2017-06-08', 1, '어디시 어딘가동 어디호', 63000, 50400, '0000-00-00'),
(99, '김석진', 'JEJU KISS 초콜릿', '불확정', '2017-06-22', 9, '어디시 어딘가동 어디호', 139500, 132525, '0000-00-00'),
(100, '김윤기', '제주 토종닭(무항생제)', '불확정', '2017-06-13', 9, '어디시 어딘가동 어디호', 450000, 405000, '0000-00-00'),
(101, '김태형', '노스테 순한 썬블럭', '불확정', '2017-06-24', 1, '어디시 어딘가동 어디호', 18500, 14800, '0000-00-00'),
(102, '김효종', '제주 토종닭(무항생제)', '구매확정', '2017-05-14', 10, '어디시 어딘가동 어디호', 500000, 400000, '2017-05-15'),
(103, '김현식', '동백 스크럽 페이스트', '불확정', '2017-05-24', 9, '어디시 어딘가동 어디호', 238500, 226575, '0000-00-00'),
(104, '김정국', '제주명품 마유비누', '구매확정', '2017-05-21', 2, '어디시 어딘가동 어디호', 49000, 46550, '2017-05-22'),
(105, '김민석', '오늘은 홍차', '구매확정', '2017-05-25', 5, '어디시 어딘가동 어디호', 87500, 74375, '2017-05-26'),
(106, '김영배', '녹차 비누', '구매확정', '2017-05-06', 3, '어디시 어딘가동 어디호', 44400, 37740, '2017-05-07'),
(107, '김지용', '감귤 과즐', '불확정', '2017-05-18', 3, '어디시 어딘가동 어디호', 55500, 49950, '0000-00-00'),
(108, '김종대', '감귤 과즐', '구매확정', '2017-05-10', 2, '어디시 어딘가동 어디호', 37000, 35150, '2017-05-11'),
(109, '김호석', '제주명품 마유', '구매확정', '2017-05-12', 8, '어디시 어딘가동 어디호', 344000, 326800, '2017-05-13'),
(110, '김남준', '자리돔 통 젓갈', '구매확정', '2017-05-22', 1, '어디시 어딘가동 어디호', 19500, 16575, '2017-05-23'),
(111, '김백현', '한라봉 초콜릿', '불확정', '2017-06-11', 10, '어디시 어딘가동 어디호', 49000, 44100, '0000-00-00'),
(112, '김지호', '제주명품 마유', '구매확정', '2017-06-03', 3, '어디시 어딘가동 어디호', 129000, 109650, '2017-06-04'),
(113, '김선재', '껍찔째 마시는 감귤주스', '불확정', '2017-06-25', 4, '어디시 어딘가동 어디호', 42000, 35700, '0000-00-00'),
(114, '김문복', '동백 페이스 오일', '구매확정', '2017-06-07', 5, '어디시 어딘가동 어디호', 170000, 161500, '2017-06-08'),
(115, '김지용', '마유 수분크림', '구매확정', '2017-05-12', 2, '어디시 어딘가동 어디호', 74000, 66600, '2017-05-13'),
(116, '김종인', '감귤 과즐', '구매확정', '2017-05-22', 7, '어디시 어딘가동 어디호', 129500, 123025, '2017-05-23'),
(117, '김남준', '제주 밀감생꿀', '구매확정', '2017-05-02', 6, '어디시 어딘가동 어디호', 87000, 73950, '2017-05-03'),
(118, '김태형', '제주 유채생꿀', '불확정', '2017-05-29', 8, '어디시 어딘가동 어디호', 80000, 64000, '0000-00-00'),
(128, '김지민', '독립운동가 반팔 티셔츠(블랙)', '구매확정', '2023-07-17', 8, '히하하', 152000, 136800, '2023-07-17'),
(129, '김지민', '독립운동기념유공굿즈 머그컵(블랙)', '구매확정', '2023-07-17', 1, '히하하', 5000, 4500, '2023-07-17'),
(130, '김지민', '독립운동기념유공굿즈 머그컵(화이트)', '구매확정', '2023-07-17', 3, '굿', 15000, 13500, '2023-07-17'),
(131, '김지민', '독립운동가 일러스트 스마트톡', '불확정', '2023-07-17', 3, '굿', 28500, 25650, '0000-00-00'),
(132, '김지민', '만세소녀 열쇠고리세트', '불확정', '2023-07-17', 4, 'fe', 74000, 66600, '0000-00-00');

-- --------------------------------------------------------

--
-- 테이블 구조 `review`
--

CREATE TABLE `review` (
  `idx` int(200) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` varchar(200) NOT NULL,
  `rate` float NOT NULL,
  `name` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `productid` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `review`
--

INSERT INTO `review` (`idx`, `title`, `content`, `rate`, `name`, `date`, `productid`) VALUES
(2, 'ddd', 'ffff', 0, '김지민', '2023-07-17', '9'),
(3, 'fdf', 'efe', 0.3, '김지민', '2023-07-17', '9'),
(4, 'cx', 'gre', 0.2, '김지민', '2023-07-17', '4'),
(5, 'dfghdfg', 'gffd', 0, '김지민', '2023-07-17', '4'),
(6, 'dpd', 'fewf', 0, '김지민', '2023-07-17', '1'),
(7, 'fefe', 'fdfd', 0.2, '김지민', '2023-07-17', '1');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `reserve`
--
ALTER TABLE `reserve`
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
-- 테이블의 AUTO_INCREMENT `data`
--
ALTER TABLE `data`
  MODIFY `idx` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- 테이블의 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `idx` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- 테이블의 AUTO_INCREMENT `reserve`
--
ALTER TABLE `reserve`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- 테이블의 AUTO_INCREMENT `review`
--
ALTER TABLE `review`
  MODIFY `idx` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
