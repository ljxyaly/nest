/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 25/03/2024 18:32:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(0) DEFAULT NULL,
  `updated_at` datetime(0) DEFAULT NULL,
  `deleted_at` datetime(0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 140 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '1126925449@163.com', 'jx', '$2b$10$ghbNqEbpSlG54O.70MsWhu5pydMndFf0ciJ49F7BNUTwOqmSt9T/C', NULL, NULL, NULL);
INSERT INTO `user` VALUES (2, NULL, 'lkxkda', '$2b$10$ghbNqEbpSlG54O.70MsWhu5pydMndFf0ciJ49F7BNUTwOqmSt9T/C', NULL, NULL, NULL);
INSERT INTO `user` VALUES (68, NULL, '145888', '$2b$10$ghbNqEbpSlG54O.70MsWhu5pydMndFf0ciJ49F7BNUTwOqmSt9T/C', NULL, NULL, NULL);
INSERT INTO `user` VALUES (76, '112692544@qq.com', '9999', '$2b$10$ghbNqEbpSlG54O.70MsWhu5pydMndFf0ciJ49F7BNUTwOqmSt9T/C', NULL, NULL, NULL);
INSERT INTO `user` VALUES (103, '11269244@qq.com', '9999999', '$2b$10$ghbNqEbpSlG54O.70MsWhu5pydMndFf0ciJ49F7BNUTwOqmSt9T/C', NULL, NULL, NULL);
INSERT INTO `user` VALUES (125, '1269244@qq.com', '5120000', '$2b$10$ghbNqEbpSlG54O.70MsWhu5pydMndFf0ciJ49F7BNUTwOqmSt9T/C', NULL, NULL, NULL);
INSERT INTO `user` VALUES (128, '1269244@163.com', 'ipccccc', '$2b$10$4iSrXweO5ZMsNAHesmXoEeBqCheNukxi7ltqRr6cJGO6aBPvjDoYW', NULL, NULL, NULL);
INSERT INTO `user` VALUES (132, '12692@163.com', 'ipccc', '$2b$10$4iSrXweO5ZMsNAHesmXoEeBqCheNukxi7ltqRr6cJGO6aBPvjDoYW', NULL, NULL, NULL);
INSERT INTO `user` VALUES (134, '1269287777@163.com', 'ipc789', '$2b$10$4iSrXweO5ZMsNAHesmXoEeBqCheNukxi7ltqRr6cJGO6aBPvjDoYW', NULL, NULL, NULL);
INSERT INTO `user` VALUES (136, '126928777@163.com', 'ipc89', '$2b$10$4iSrXweO5ZMsNAHesmXoEeBqCheNukxi7ltqRr6cJGO6aBPvjDoYW', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
