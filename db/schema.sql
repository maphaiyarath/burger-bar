DROP DATABASE IF EXISTS burgerbar;
CREATE DATABASE burgerbar;
USE burgerbar;

CREATE TABLE burgers
(
    id INT NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(255) NOT NULL,
    devoured BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);