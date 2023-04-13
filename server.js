require("dotenv").config();
const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const prompts = require("./prompts");

// might not need express for this
// const express = require("express");
// const app = express();

// es6 syntax
// import * as dotenv from "dotenv";
// dotenv.config();

// connect to database
const employeeDB = mysql.createConnection(
    {
        // either need to use 127.0.0.1 or localhost
        // not sure if I need to use a port
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);
