const inquirer = require("inquirer");
const employeeDB = require("./db/connection.js");
require("console.table");

dbMenu = async () => {
  const dbActions = await inquirer
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
      console.log(answer);
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

viewAllEmployees = () => {
  console.log("View All Employees");
  const viewEmployeeQuery = `SELECT * FROM employee`;
  employeeDB.query(viewEmployeeQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
    dbMenu();
  });
};

viewAllDepartments = () => {
  console.log("View All Departments");
  const viewDepartmentQuery = `SELECT * FROM department`;
  employeeDB.query(viewDepartmentQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
    dbMenu();
  });
};

viewAllRoles = () => {
  console.log("View All Roles");
  const viewRoleQuery = `SELECT * FROM employee_role`;
  employeeDB.query(viewRoleQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
    dbMenu();
  });
};

viewEmployeesByDepartment = () => {
  console.log("View Employees By Department");
  const viewEmployeeByDepartmentQuery = `SELECT * FROM employee WHERE department_id = ?`;
  employeeDB.query(viewEmployeeByDepartmentQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
    dbMenu();
  });
};

addEmployee = () => {
  console.log("Add Employee");
  const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
  employeeDB.query(addEmployeeQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

exit = () => {
  employeeDB.end();
  console.log("Goodbye!");
};

dbMenu();
