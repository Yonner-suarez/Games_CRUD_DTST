-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2024 a las 22:50:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12




--
-- Base de datos: `games_crud`
CREATE DATABASE games_crud
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `quotations`
--

CREATE TABLE `crud_consoles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,  -- Nombre de la consola (e.g. PlayStation 5, Xbox Series X)
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

CREATE TABLE `crud_games` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `console_id` INT(11) NOT NULL,  -- Se hace referencia a la tabla consoles
  `description` TEXT NOT NULL,
  `releaseYear` INT(4) NOT NULL,
  `numberOfPlayers` INT(11) NOT NULL,
  `image` LONGBLOB,  -- Para almacenar imágenes en formato binario
  PRIMARY KEY (`id`),
  FOREIGN KEY (`console_id`) REFERENCES `crud_consoles`(`id`) ON DELETE CASCADE  -- Relación con consolas
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- --------------------------------------------------------


-- Insersion de consoles por default
INSERT INTO `crud_consoles` (`name`)
VALUES
('Nintendo Switch'),
('Xbox Series S'),
('PlayStation 4'),
('PlayStation 3'),
('Xbox One'),
('Nintendo 3DS'),
('Sega Genesis'),
('Super Nintendo Entertainment System (SNES)');


-- Se agrega una columna para borrado logico 
ALTER TABLE crud_games ADD COLUMN activo TINYINT(1) DEFAULT 1;


