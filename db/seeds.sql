INSERT INTO employees (id, first_name, last_name, title, department, salary, manager) 
VALUES (1, 'John', 'Smith', 'CEO', 'Management', 300000, NULL),
       (2, 'Yolanda', 'Ruiz', 'VP', 'Management', 200000, NULL),
       (3, 'Mike', 'Chan', 'Salesperson', 'Sales', 50000, 'Ashley Rodriguez'),
       (4, 'Ashley', 'Rodriguez', 'Sales Lead', 'Sales', 70000, NULL),
       (5, 'Kevin', 'Tupik', 'Software Engineer', 'Engineering', 120000, 'Andrew Trento'),
       (6, 'Andrew', 'Trento', 'Lead Engineer', 'Engineering', 160000, NULL),
       (7, 'Kunal', 'Singh', 'Account Manager', 'Finance', 150000, NULL),
       (8, 'Malia', 'Brown', 'Accountant', 'Finance', 115000, 'Kunal Singh'),
       (9, 'Jessica', 'Kensil', 'Legal Team Lead', 'Legal', 250000, NULL),
       (10, 'Sarah', 'Lourd', 'Lawyer', 'Legal', 180000, 'Jessica Kensil')