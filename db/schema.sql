DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    title VARCHAR (100) NOT NULL,
    department VARCHAR (30) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(30),
)