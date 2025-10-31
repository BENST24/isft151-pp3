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

CREATE TABLE `appointment` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_client VARCHAR(100) UNIQUE NOT NULL,
    surname_client VARCHAR(100) NOT NULL,
    dni INT NOT NULL,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    id_activity INT NO NULL,
    state VARCHAR(25) NOT NULL DEFAULT 'PENDING',
    CHECK (state IN ('CANCELED', 'PENDING_RESCHEDULING', 'PENDING', 'ATTENDED'))
);

-- Cambia el delimitador para poder definir el procedimiento
DELIMITER //

CREATE PROCEDURE `UpdatePendingToAttended`()
BEGIN
    -- Actualiza los registros que cumplen las condiciones
    UPDATE `appointment`
    SET `state` = 'ATTENDED'
    WHERE `state` = 'PENDING' -- 1. Solo los que están PENDIENTES
    -- 2. Combina la fecha y hora de la cita y la compara con la fecha y hora actual
    AND CONCAT(data, ' ', hour) < NOW(); 
END //

-- Vuelve a establecer el delimitador por defecto
DELIMITER ;

-- Se crea el evento programado
CREATE EVENT `auto_state_update_event`
ON SCHEDULE EVERY 1 HOUR -- Ejecuta la tarea CADA HORA
STARTS CURRENT_TIMESTAMP -- Comienza inmediatamente
DO
    -- Llama al procedimiento almacenado
    CALL `UpdatePendingToAttended`();

-- -----------------------------------------------------
-- insert para el primer Supervisor precargado
-- -----------------------------------------------------
INSERT INTO User (name, password, type, failedLoginCounter, isLocked)
VALUES ('admin', 'Admin123', 'SUPERVISOR', 0, FALSE);