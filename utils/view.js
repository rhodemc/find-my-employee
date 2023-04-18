// dependencies
const employeeDB = require("../db/connection");
const inquirer = require("inquirer");

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
viewEmployeesByManager = () => {
  employeeDB.query(
    `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS manager
        FROM employee
        WHERE employee.manager_id IS NULL`,
    (err, res) => {
      if (err) throw err;
      const managers = res.map((manager) => ({
        name: manager.manager,
        value: manager.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "manager",
            message: "Which manager would you like to view?",
            choices: managers,
          },
        ])
        .then((answer) => {
          employeeDB.query(
            `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN employee_role on employee.role_id = employee_role.id
                LEFT JOIN department on employee_role.department_id = department.id
                LEFT JOIN employee manager on manager.id = employee.manager_id
                WHERE manager.id = ?`,
            [answer.manager],
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

// export functions
module.exports = {
  viewAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  viewEmployeesByDepartment,
  viewEmployeesByManager,
  viewTotalUtilizedBudget,
};
