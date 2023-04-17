// dependencies
const inquirer = require("inquirer");
const employeeDB = require("./db/connection.js");
require("console.table");

// import functions
const {
  viewAllEmployees,
  viewAllDepartments,
  viewAllRoles,
  viewEmployeesByDepartment,
  viewTotalUtilizedBudget,
} = require("./utils/view.js");
const { addEmployee, addDepartment, addRole } = require("./utils/add.js");
const { updateEmployeeRole, updateEmployeeManager } = require("./utils/update.js");
const { deleteEmployee, deleteDepartment, deleteRole } = require("./utils/delete.js");

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

exit = () => {
  employeeDB.end();
  console.log("Goodbye!");
};

dbMenu();
