DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES('Management'), ('Sales'), ('Engineering'), ('finance'),('Legal')


CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT,
  PRIMARY KEY(id)
);


INSERT INTO role(title, salary, department_id)
VALUES('Sales Lead', 12000, 2), ('Salesperson', 80000, 2), ('Lead Engineer', 150000, , 3), ('Software Engineer', 120000, 3), ('Accountant', 125000, 4), ('Entrepreneur', 200000, 1)


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES('John', 'Adams', 1, 3), ('Mike', 'Epps', 2, 6), ('kevin', 'Gate', 3, NULL), ('Ben', 'Smalls', 4, 6), ('Tom', 'Brady', 5, 3), ('Chirstian', 'Rodriguez', 6, NULL), ('Ashley', 'Withers', 2, 3);
