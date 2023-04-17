// dependencies
const inquirer = require("inquirer");
const employeeDB = require("./db/connection.js");
require("console.table");

// start the application
dbMenu = async () => {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "userOptions",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "View Employees By Department",
          "View Employees By Manager",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",
          "Update Employee Manager",
          "Delete Employee",
          "Delete Department",
          "Delete Role",
          "View Total Utilized Budget of a Department",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.userOptions) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View Employees By Department":
          viewEmployeesByDepartment();
          break;
        case "View Employees By Manager":
          viewEmployeesByManager();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeManager();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "View Total Utilized Budget of a Department":
          viewTotalUtilizedBudget();
          break;
        case "Exit":
          exit();
          break;
      }
    });
};

// view all employees
viewAllEmployees = () => {
  employeeDB.query(
    `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
      FROM employee 
      LEFT JOIN employee_role on employee.role_id = employee_role.id
      LEFT JOIN department on employee_role.department_id = department.id
      LEFT JOIN employee manager on manager.id = employee.manager_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      dbMenu();
    }
  );
};

// view all departments
viewAllDepartments = () => {
  employeeDB.query(`Select * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    dbMenu();
  });
};

// view all roles
viewAllRoles = () => {
  employeeDB.query(
    `SELECT employee_role.id, employee_role.title, department.department_name AS department, employee_role.salary 
      FROM employee_role 
      LEFT JOIN department on employee_role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      dbMenu();
    }
  );
};

// view employees by department
viewEmployeesByDepartment = () => {
  employeeDB.query(
    `SELECT department.id, department.department_name AS department
      FROM department`,
    (err, res) => {
      if (err) throw err;
      const departments = res.map((department) => ({
        name: department.department,
        value: department.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "department",
            message: "Which department would you like to view?",
            choices: departments,
          },
        ])
        .then((answer) => {
          employeeDB.query(
            `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
              FROM employee
              LEFT JOIN employee_role on employee.role_id = employee_role.id
              LEFT JOIN department on employee_role.department_id = department.id
              LEFT JOIN employee manager on manager.id = employee.manager_id
              WHERE department.id = ?`,
            [answer.department],
            (err, res) => {
              if (err) throw err;
              console.table(res);
              dbMenu();
            }
          );
        });
    }
  );
};

// view employees by manager
// viewEmployeesByManager = () => {
//   employeeDB.query(
//     `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
//       FROM employee
//       LEFT JOIN employee_role on employee.role_id = employee_role.id
//       LEFT JOIN department on employee_role.department_id = department.id
//       LEFT JOIN employee manager on manager.id = employee.manager_id
//       WHERE employee.manager_id IS NOT NULL`,
//     (err, res) => {
//       if (err) throw err;
//       const managers = res.map((manager) => ({
//         name: manager.manager,
//         value: manager.id,
//       }));
//       inquirer
//         .prompt([
//           {
//             type: "list",
//             name: "manager",
//             message: "Which manager would you like to view?",
//             choices: managers,
//           },
//         ])
//         .then((answer) => {
//           employeeDB.query(
//             // q why is this query wrong?
//             // a because you're not using the manager id
//             // q well, write the query
//             // a ok
//             `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
//               FROM employee
//               LEFT JOIN employee_role on employee.role_id = employee_role.id
//               LEFT JOIN department on employee_role.department_id = department.id
//               LEFT JOIN employee manager on manager.id = employee.manager_id
//               WHERE employee.manager_id =`,
//             [answer.manager],
//             (err, res) => {
//               if (err) throw err;
//               console.table(res);
//               dbMenu();
//             }
//           );
//         });
//     }
//   );
// };

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

// update employee role
updateEmployeeRole = () => {
  employeeDB.query(
    `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary
      FROM employee
      LEFT JOIN employee_role on employee.role_id = employee_role.id
      LEFT JOIN department on employee_role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      const employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));
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
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "Which employee would you like to update?",
                choices: employees,
              },
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((answer) => {
              employeeDB.query(
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                [answer.role, answer.employee],
                (err, res) => {
                  if (err) throw err;
                  console.log("Employee updated!");
                  dbMenu();
                }
              );
            });
        }
      );
    }
  );
};

// update employee manager
updateEmployeeManager = () => {
  employeeDB.query(
    `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary
      FROM employee
      LEFT JOIN employee_role on employee.role_id = employee_role.id
      LEFT JOIN department on employee_role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      const employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee would you like to update?",
            choices: employees,
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee's new manager?",
            choices: employees,
          },
        ])
        .then((answer) => {
          employeeDB.query(
            `UPDATE employee SET manager_id = ? WHERE id = ?`,
            [answer.manager, answer.employee],
            (err, res) => {
              if (err) throw err;
              console.log("Employee updated!");
              dbMenu();
            }
          );
        });
    }
  );
};

// delete employee from database
deleteEmployee = () => {
  employeeDB.query(
    `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary
      FROM employee
      LEFT JOIN employee_role on employee.role_id = employee_role.id
      LEFT JOIN department on employee_role.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      const employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee would you like to delete?",
            choices: employees,
          },
        ])
        .then((answer) => {
          employeeDB.query(`DELETE FROM employee WHERE id = ?`, [answer.employee], (err, res) => {
            if (err) throw err;
            console.log("Employee deleted!");
            dbMenu();
          });
        });
    }
  );
};

// // delete department from database
// deleteDepartment = () => {
//   employeeDB.query(`SELECT * FROM department`, (err, res) => {
//     if (err) throw err;
//     const departments = res.map((department) => ({
//       name: department.department_name,
//       value: department.id,
//     }));
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "department",
//           message: "Which department would you like to delete?",
//           choices: departments,
//         },
//       ])
//       .then((answer) => {
//         employeeDB.query(`DELETE FROM department WHERE id = ?`, [answer.department], (err, res) => {
//           if (err) throw err;
//           console.log("Department deleted!");
//           dbMenu();
//         });
//       });
//   });
// };

// delete role from database
deleteRole = () => {
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
      inquirer
        .prompt([
          {
            type: "list",
            name: "role",
            message: "Which role would you like to delete?",
            choices: roles,
          },
        ])
        .then((answer) => {
          employeeDB.query(`DELETE FROM employee_role WHERE id = ?`, [answer.role], (err, res) => {
            if (err) throw err;
            console.log("Role deleted!");
            dbMenu();
          });
        });
    }
  );
};

// view total utilized budget of a department
viewTotalUtilizedBudget = () => {
  employeeDB.query(
    `SELECT department.id, department.department_name AS department, SUM(employee_role.salary) AS budget
      FROM employee
      LEFT JOIN employee_role on employee.role_id = employee_role.id
      LEFT JOIN department on employee_role.department_id = department.id
      GROUP BY department.id, department.department_name`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      dbMenu();
    }
  );
};

exit = () => {
  employeeDB.end();
  console.log("Goodbye!");
};

dbMenu();
