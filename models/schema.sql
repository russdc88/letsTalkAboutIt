DROP DATABASE IF EXISTS chat_db;
CREATE DATABASE chat_db;

-- CREATE TABLE `users` (
--  `id` int(11) NOT NULL AUTO_INCREMENT,
--  `firstName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
--  `lastName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
--  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
--  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
--  'imgUrl' varchar(1000) NOT NULL,
--  PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- GRANT SELECT,INSERT,UPDATE,DELETE ON `DATABASE`.* TO 'USERNAME'@'HOSTNAME'


-- GRANT ALL PRIVILEGES ON *.* TO 'USERNAME'@'HOSTNAME' WITH GRANT OPTION

-- SHOW GRANTS FOR 'USERNAME'@'HOSTNAME'
-- CREATE USER user_account IDENTIFIED BY password;
-- CREATE USER dbadmin@localhost 
-- IDENTIFIED BY 'secret';
-- SHOW GRANTS FOR dbadmin@localhost;

-- +---------------------------------------------+
-- | Grants for dbadmin@localhost                |
-- +---------------------------------------------+
-- | GRANT USAGE ON *.* TO `dbadmin`@`localhost` |
-- +---------------------------------------------+
-- 1 row in set (0.00 sec)

-- CREATE USER superadmin@'%'
-- IDENTIFIED BY 'secret';

-- CREATE USER mysqladmin@'%.mysqltutorial.org'
-- IDENTIFIED by 'secret';

-- DROP DATABASE IF EXISTS chat_db;
-- CREATE DATABASE testdb;
