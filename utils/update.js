// dependencies
const employeeDB = require("../db/connection");
const inquirer = require("inquirer");

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

// export functions
module.exports = { updateEmployeeRole, updateEmployeeManager };
