CREATE SCHEMA IF NOT EXISTS `isft151-pp3-proyecto` DEFAULT CHARACTER SET utf8 ;
USE `isft151-pp3-proyecto` ;


-- -----------------------------------------------------
-- Tabla: user
-- -----------------------------------------------------
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    type VARCHAR(15) NOT NULL,
    failedLoginCounter INT DEFAULT 0,
    isLocked BOOLEAN DEFAULT FALSE
);

CREATE TABLE `activity` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    duration DOUBLE NOT NULL
);

CREATE TABLE `working_day` (
    day varchar(15) PRIMARY KEY,
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    id_activity INT,
    FOREIGN KEY (id_activity) REFERENCES activity(id),
    CHECK (day IN ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY')),
    CHECK (start_hour < end_hour)
);

-- -----------------------------------------------------
-- insert para el primer Supervisor precargado
-- -----------------------------------------------------
INSERT INTO User (name, password, type, failedLoginCounter, isLocked)
VALUES ('admin', 'Admin123', 'SUPERVISOR', 0, FALSE);