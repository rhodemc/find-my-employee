INSERT INTO department (id, department_name)
VALUES (1, 'Management'),
       (2, 'Sales'),
       (3, 'Engineering'),
       (4, 'Finance'),
       (5, 'Legal');

INSERT INTO employee_role (id, title, salary, department_id)
VALUES (1, 'CEO', 300000, 1),
       (2, 'VP', 200000, 1),
       (3, 'Salesperson', 50000, 2),
       (4, 'Sales Lead', 70000, 2),
       (5, 'Software Engineer', 120000, 3),
       (6, 'Lead Engineer', 160000, 3),
       (7, 'Accounting Manager', 150000, 4),
       (8, 'Accountant', 115000, 4),
       (9, 'Legal Team Lead', 250000, 5),
       (10, 'Lawyer', 180000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Anze', 'Kopitar', 1, NULL),
       (2, 'Adrian', 'Kempe', 2, 1),
       (3, 'Trevor', 'Moore', 3, 4),
       (4, 'Blake', 'Lizotte', 4, NULL),
       (5, 'Drew', 'Doughty', 5, 6),
       (6, 'Phoenix', 'Copley', 6, NULL),
       (7, 'Kevin', 'Fiala', 7, NULL),
       (8, 'Sean', 'Durzi', 8, 7),
       (9, 'Alex', 'Iafallo', 9, NULL),
       (10, 'Viktor', 'Arvidsson', 10, 9);