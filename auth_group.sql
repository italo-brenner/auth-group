-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 10-Set-2018 às 21:54
-- Versão do servidor: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_group`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `application_user`
--

CREATE TABLE `application_user` (
  `id` bigint(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `user_group_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `application_user`
--

INSERT INTO `application_user` (`id`, `password`, `username`, `user_group_id`) VALUES
(1, '123', 'root', 2),
(2, '123', 'book', 3),
(3, '123', 'plane', 4),
(4, '123', 'car', 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `book`
--

CREATE TABLE `book` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `book`
--

INSERT INTO `book` (`id`, `name`) VALUES
(1, 'Dom Casmurro'),
(2, 'Dom Quixote'),
(3, 'Os Sertões');

-- --------------------------------------------------------

--
-- Estrutura da tabela `car`
--

CREATE TABLE `car` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `car`
--

INSERT INTO `car` (`id`, `name`) VALUES
(1, 'Volvo'),
(2, 'Gol'),
(3, 'Palio');

-- --------------------------------------------------------

--
-- Estrutura da tabela `menu`
--

CREATE TABLE `menu` (
  `id` bigint(20) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_group_id` bigint(20) DEFAULT NULL,
  `font_awesome` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `menu`
--

INSERT INTO `menu` (`id`, `link`, `title`, `user_group_id`, `font_awesome`) VALUES
(1, '/', 'Home', NULL, 'globe'),
(2, '/users/login', 'Login', NULL, 'user'),
(3, '/users', 'Usuários', NULL, 'users'),
(4, '/resources', 'Recursos', NULL, 'sitemap'),
(5, '/menus', 'Menu', NULL, 'bars'),
(6, '/page1', 'Página 1', NULL, 'file'),
(7, '/cars', 'Carros', NULL, 'car'),
(8, '/books', 'Livros', NULL, 'book'),
(9, '/planes', 'Aviões', NULL, 'plane'),
(10, '/users/logout', 'Logout', NULL, 'sign-out');

-- --------------------------------------------------------

--
-- Estrutura da tabela `menu_list_user_group`
--

CREATE TABLE `menu_list_user_group` (
  `list_menu_id` bigint(20) NOT NULL,
  `list_user_group_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `menu_list_user_group`
--

INSERT INTO `menu_list_user_group` (`list_menu_id`, `list_user_group_id`) VALUES
(1, 1),
(2, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(3, 2),
(4, 2),
(5, 2),
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(7, 5),
(7, 2),
(8, 3),
(8, 2),
(9, 2),
(9, 4),
(10, 2),
(10, 3),
(10, 4),
(10, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `plane`
--

CREATE TABLE `plane` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `plane`
--

INSERT INTO `plane` (`id`, `name`) VALUES
(1, 'Lockheed Martin F-22 Raptor'),
(2, 'Grumman F-14 Tomcat'),
(3, 'General Dynamics F-16 Fighting Falcon');

-- --------------------------------------------------------

--
-- Estrutura da tabela `resource`
--

CREATE TABLE `resource` (
  `id` bigint(20) NOT NULL,
  `method` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `resource`
--

INSERT INTO `resource` (`id`, `method`, `name`) VALUES
(1, 'GET', '/api/cars'),
(2, 'POST', '/api/cars'),
(3, 'GET', '/api/cars/{id}'),
(4, 'PUT', '/api/cars/{id}'),
(5, 'DELETE', '/api/cars/{id}'),
(6, 'GET', '/api/cars/page');

-- --------------------------------------------------------

--
-- Estrutura da tabela `resource_list_user_group`
--

CREATE TABLE `resource_list_user_group` (
  `list_resource_id` bigint(20) NOT NULL,
  `list_user_group_id` bigint(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `resource_list_user_group`
--

INSERT INTO `resource_list_user_group` (`list_resource_id`, `list_user_group_id`) VALUES
(1, 1),
(2, 2),
(2, 5),
(3, 1),
(4, 2),
(4, 5),
(5, 5),
(5, 2),
(6, 1),
(1, 2),
(1, 5),
(3, 2),
(3, 5),
(6, 2),
(6, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_group`
--

CREATE TABLE `user_group` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user_group`
--

INSERT INTO `user_group` (`id`, `name`) VALUES
(1, 'ROLE_ANONYMOUS'),
(2, 'ROLE_ROOT'),
(3, 'ROLE_BOOK'),
(4, 'ROLE_PLANE'),
(5, 'ROLE_CAR');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application_user`
--
ALTER TABLE `application_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK14qhu4jb4b86vjiw8ax2u2p7d` (`user_group_id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKcawfchw09ujt2qq5qo7etycne` (`user_group_id`);

--
-- Indexes for table `menu_list_user_group`
--
ALTER TABLE `menu_list_user_group`
  ADD KEY `FKc5g6kyr4vxu2gqatf8243itwa` (`list_user_group_id`),
  ADD KEY `FKddpkwdcdeak62pycwis37i7sk` (`list_menu_id`);

--
-- Indexes for table `plane`
--
ALTER TABLE `plane`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resource`
--
ALTER TABLE `resource`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resource_list_user_group`
--
ALTER TABLE `resource_list_user_group`
  ADD KEY `FKnd1n4pajiv6m9vy1nmy92kg16` (`list_user_group_id`),
  ADD KEY `FKluxqr4afb8dworuu2w3wya367` (`list_resource_id`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application_user`
--
ALTER TABLE `application_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `plane`
--
ALTER TABLE `plane`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `resource`
--
ALTER TABLE `resource`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
