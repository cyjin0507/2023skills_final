-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 23-07-25 09:27
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
-- 테이블 구조 `basket`
--

CREATE TABLE `basket` (
  `idx` int(11) NOT NULL,
  `sidx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `basket`
--

INSERT INTO `basket` (`idx`, `sidx`, `uidx`) VALUES
(13, 2, 1);

-- --------------------------------------------------------

--
-- 테이블 구조 `purchase`
--

CREATE TABLE `purchase` (
  `idx` int(11) NOT NULL,
  `sidx` int(11) NOT NULL,
  `uidx` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `create_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `purchase`
--

INSERT INTO `purchase` (`idx`, `sidx`, `uidx`, `count`, `create_date`) VALUES
(12, 2, 1, 1, '2023-07-25');

-- --------------------------------------------------------

--
-- 테이블 구조 `specialties`
--

CREATE TABLE `specialties` (
  `idx` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `point` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `specialties`
--

INSERT INTO `specialties` (`idx`, `name`, `description`, `point`, `image`) VALUES
(1, '호두과자', '호두과자는 고소하고 달콤한 맛을 가진 호두를 이용하여 만들어진 간식으로, 호두알을 실링하여 밀가루로 된 외피에 구워내어 바삭하면서도 부드러운 식감을 제공합니다.', '2500', '호두과자.jpg'),
(2, '거봉포도', '거봉포도는 신맛과 달콤함이 어우러진 맛있는 과일로, 보통 빨간색이 특징적입니다. 크기는 중간 정도이며, 부드럽고 촉촉한 과육을 가지고 있습니다. 거봉포도는 상큼한 맛과 고급스러운 외모로 인기가 있는 포도 품종 중 하나입니다.', '1500', '거봉포도.jpg'),
(3, '도솔 연미주', '도솔 연미주는 대한민국 충청남도 천안시에서 유명한 전통주 중 하나로, 청주라고도 불립니다. 술의 재료로는 쌀과 누룩을 사용하며, 전통적인 방식으로 발효와 증류 과정을 거쳐 만들어집니다. 도솔 연미주는 약간의 단 맛과 고소한 향이 특징이며, 부드럽고 깔끔한 맛을 가지고 있습니다. 전통적인 제조 방법과 특별한 지역적 특성을 지니고 있습니다.', '7000', '도솔 연미주.jpg'),
(4, '도토리묵', '도토리묵은 고소하면서도 쫄깃한 식감을 가지고 있으며, 도토리의 특유의 풍미를 느낄 수 있습니다.', '3550', '도토리묵.jpg'),
(5, '두레앙 와인', '두레앙 와인은 고유한 발효 과정을 거치고, 알코올 도수가 비교적 낮은 편이어서 부드럽고 가벼운 맛을 선사합니다. 신선한 야자나무 꽃을 사용하여 만들어지는 특별한 향기는 한 모금을 마실 때마다 환상적인 경험을 선사해줍니다.', '15000', '두레앙 와인.jpg'),
(6, '버섯', '버섯은 부드럽고 촉촉한 질감과 풍부한 풍미를 가지고 있습니다. 맛은 고소하고 향기로우며, 요리에 다양하게 활용될 수 있습니다. 스프, 볶음 요리, 찌개 등 다양한 음식에 사용되어 버섯 특유의 풍미와 영양을 더해줍니다.', '6000', '버섯.jpg'),
(7, '병천순대', '병천 순대는 쫄깃하면서도 고소하고 풍부한 맛을 가지고 있으며, 특유의 식감과 향미가 즐거운 순대입니다. 순대를 먹을 때는 대개 삶거나 굽는 방식으로 조리되며, 전통적인 먹는 방법은 소금과 고춧가루에 찍어서 맛보는 것입니다.', '5000', '병천순대.jpg'),
(8, '보리 고추장', '보리 고추장은 강한 매운 맛보다는 고소하고 살짝 달콤한 맛을 가지고 있으며, 고추의 풍미와 보리의 고소한 맛이 조화롭게 어우러집니다. 이러한 맛과 향으로 인해 보리 고추장은 다양한 음식의 양념으로 사용되며, 국물 요리, 무침, 볶음 요리 등에 활용됩니다.', '9000', '보리 고추장.jpg'),
(9, '빠금장', '빠금장은 간장을 베이스로 하되, 고추와 다양한 양념재료를 믹싱하여 만들어집니다. 고추의 매운 맛과 풍미, 다시마와 멸치의 깊은 감칠맛이 양념에 잘 어우러져 특별한 맛을 선사합니다. 빠금장은 고기나 해산물 요리, 무침, 볶음 요리 등에 활용되며, 맛과 향을 한층 높여줍니다.', '10000', '빠금장.jpg'),
(10, '성환 개구리참외', '성환 개구리참외는 크기가 크고 푸른 표피에 황금빛 줄무늬가 있는 모습으로 인상적입니다. 단단하고 고르게 익은 과육은 달콤하면서도 상큼한 맛을 가지고 있으며, 산도가 적당하여 입안에서 즐기기 좋습니다.', '8500', '성환 개구리참외.jpg'),
(11, '성환 배', '성환 배는 상큼하면서도 달콤한 맛과 풍부한 과즙을 가지고 있어 입안에서 즐겁게 느낄 수 있습니다. 그리고 익은 배의 고유한 향기는 매우 상쾌하며, 여름철 시원한 감미로움을 선사합니다.', '8500', '성환 배.jpg'),
(12, '수신멜론', '수신멜론은 녹색에서 크게 변화하여 노란색으로 익어가며, 외피는 부드럽고 내부의 과육은 촉촉하고 달콤한 맛을 가지고 있습니다. 신선한 수신멜론은 입안에서 즐겁게 녹아내리며, 시원한 감미로움을 선사합니다.', '11000', '수신멜론.jpg'),
(13, '한과', '한과는 다양한 종류의 과자가 있으며, 각각의 과자마다 고유한 맛과 모양이 있습니다. 대표적으로 인절미, 약과, 더덕약과, 찹쌀과자 등이 있으며, 이들은 각각 차별화된 재료와 제조 방법을 통해 만들어집니다.', '1000', '한과.jpg'),
(14, '헛개나무', '헛개나무 열매는 항산화 작용을 갖고 있어 세포 손상을 예방하고 면역력을 강화하는 데 도움을 줍니다. 또한, 비타민 C 함량이 높아 면역 시스템을 강화하고 감염을 예방하는 데 도움을 주는 효과가 있습니다.', '10000', '헛개나무.jpg'),
(15, '흥타령 쌀', '흥타령 쌀은 산뜻하면서도 부드러운 식감과 고소한 맛을 가지고 있습니다. 쌀알은 크기가 중간 정도로 일정하며, 백미의 밝은 색깔과 윤기로 인해 시각적으로도 매우 우수한 품질을 보여줍니다.', '30000', '흥타령 쌀.jpg');

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `idx` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `point` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`idx`, `id`, `password`, `name`, `type`, `point`) VALUES
(1, 'u01', '1234', '사용자1', '일반', 53000),
(2, 'u02', '1234', '사용자2', '일반', 0),
(3, 'g01', '1234', '가이드1', '가이드', 0),
(4, 'g02', '1234', '가이드2', '가이드', 0),
(5, 'admin', '1234', '관리자', '관리자', 0);

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`idx`);

--
-- 테이블의 인덱스 `specialties`
--
ALTER TABLE `specialties`
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
-- 테이블의 AUTO_INCREMENT `basket`
--
ALTER TABLE `basket`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 테이블의 AUTO_INCREMENT `purchase`
--
ALTER TABLE `purchase`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- 테이블의 AUTO_INCREMENT `specialties`
--
ALTER TABLE `specialties`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `idx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
