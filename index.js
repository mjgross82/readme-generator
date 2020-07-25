// Declare required modules
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown.js");

const writeFileAsync = util.promisify(fs.writeFile);

// An array of questions to ask the user

const question = [

];

// A function to initialize the program
function init() {

}

// A function call to initialize the program
init();