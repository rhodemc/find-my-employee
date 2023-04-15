const inquirer = require("inquirer");

const employeePrompts = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "employeeOptions",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
};

employeePrompts();
