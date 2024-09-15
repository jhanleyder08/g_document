/*
Navicat MySQL Data Transfer

Source Server         : Virtual
Source Server Version : 50505
Source Host           : 127.0.0.1:3306
Source Database       : dbarchiveycloud

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2024-08-29 19:58:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `asiste`
-- ----------------------------
DROP TABLE IF EXISTS `asiste`;
CREATE TABLE `asiste` (
  `cod_hospital` int(11) NOT NULL,
  `iu_hc` int(11) NOT NULL,
  `cod_servicio` int(11) DEFAULT NULL,
  PRIMARY KEY (`cod_hospital`),
  KEY `iu_hc` (`iu_hc`),
  CONSTRAINT `iu_hc` FOREIGN KEY (`iu_hc`) REFERENCES `paciente` (`iu_paciente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `nit` FOREIGN KEY (`cod_hospital`) REFERENCES `hospital` (`nit`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of asiste
-- ----------------------------

-- ----------------------------
-- Table structure for `hospital`
-- ----------------------------
DROP TABLE IF EXISTS `hospital`;
CREATE TABLE `hospital` (
  `nit` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `direccion` tinytext DEFAULT NULL,
  `cod_servicio` int(11) DEFAULT NULL,
  `iu_paciente` int(11) DEFAULT NULL,
  PRIMARY KEY (`nit`),
  KEY `cod_servicio` (`cod_servicio`),
  CONSTRAINT `cod_servicio` FOREIGN KEY (`cod_servicio`) REFERENCES `tiene` (`cod_hospital`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of hospital
-- ----------------------------

-- ----------------------------
-- Table structure for `paciente`
-- ----------------------------
DROP TABLE IF EXISTS `paciente`;
CREATE TABLE `paciente` (
  `iu_paciente` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `cod_servicio` int(11) DEFAULT NULL,
  PRIMARY KEY (`iu_paciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of paciente
-- ----------------------------

-- ----------------------------
-- Table structure for `servicio`
-- ----------------------------
DROP TABLE IF EXISTS `servicio`;
CREATE TABLE `servicio` (
  `cod_servicio` int(11) NOT NULL,
  `nombre` varchar(35) DEFAULT NULL,
  `iu_paciente` int(11) DEFAULT NULL,
  `nit_hospital` int(11) DEFAULT NULL,
  PRIMARY KEY (`cod_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of servicio
-- ----------------------------

-- ----------------------------
-- Table structure for `tiene`
-- ----------------------------
DROP TABLE IF EXISTS `tiene`;
CREATE TABLE `tiene` (
  `cod_hospital` int(11) NOT NULL,
  `cod_servisio` int(11) NOT NULL,
  `iu_hc` int(11) DEFAULT NULL,
  PRIMARY KEY (`cod_hospital`,`cod_servisio`),
  KEY `cod_servisio` (`cod_servisio`),
  CONSTRAINT `cod_servisio` FOREIGN KEY (`cod_servisio`) REFERENCES `servicio` (`cod_servicio`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of tiene
-- ----------------------------

-- ----------------------------
-- Table structure for `usuarios`
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `usuario` varchar(18) NOT NULL,
  `clave` varchar(18) DEFAULT NULL,
  `rol` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`usuario`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES ('admin', 'admin', '1', '1');
INSERT INTO `usuarios` VALUES ('daniel', '123456', '2', '1');
