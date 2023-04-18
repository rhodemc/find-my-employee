// dependencies
const employeeDB = require("../db/connection");
const inquirer = require("inquirer");

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

// delete department from database
deleteDepartment = () => {
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
            message: "Which department would you like to delete?",
            choices: departments,
          },
        ])
        .then((answer) => {
          employeeDB.query(`DELETE FROM department WHERE id = ?`, [answer.department], (err, res) => {
            if (err) throw err;
            console.log("Department deleted!");
            dbMenu();
          });
        });
    }
  );
};

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

// export functions
module.exports = { deleteEmployee, deleteDepartment, deleteRole };
