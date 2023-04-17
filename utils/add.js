// add employee to database
addEmployee = () => {
  employeeDB.query(
    `SELECT employee_role.id, employee_role.title, department.department_name AS department, employee_role.salary
        FROM employee_role
        LEFT JOIN department on employee_role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      const roles = res.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      employeeDB.query(
        `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary
            FROM employee
            LEFT JOIN employee_role on employee.role_id = employee_role.id
            LEFT JOIN department on employee_role.department_id = department.id`,
        (err, res) => {
          if (err) throw err;
          const managers = res.map((manager) => ({
            name: manager.first_name + " " + manager.last_name,
            value: manager.id,
          }));
          inquirer
            .prompt([
              {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
              },
              {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
              },
              {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: roles,
              },
              {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: managers,
              },
            ])
            .then((answer) => {
              employeeDB.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
                [answer.firstName, answer.lastName, answer.role, answer.manager],
                (err, res) => {
                  if (err) throw err;
                  console.log("Employee added!");
                  dbMenu();
                }
              );
            });
        }
      );
    }
  );
};

// add department to database
addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      employeeDB.query(`INSERT INTO department (department_name) VALUES (?)`, [answer.departmentName], (err, res) => {
        if (err) throw err;
        console.log("Department added!");
        dbMenu();
      });
    });
};

// add role to database
addRole = () => {
  employeeDB.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    const departments = res.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "What is the title of the role?",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "roleDepartment",
          message: "What department does the role belong to?",
          choices: departments,
        },
      ])
      .then((answer) => {
        employeeDB.query(
          `INSERT INTO employee_role (title, salary, department_id) VALUES (?, ?, ?)`,
          [answer.roleTitle, answer.roleSalary, answer.roleDepartment],
          (err, res) => {
            if (err) throw err;
            console.log("Role added!");
            dbMenu();
          }
        );
      });
  });
};

module.exports = { addEmployee, addDepartment, addRole };
