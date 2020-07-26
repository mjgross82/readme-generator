// Declare dependencies
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown.js");
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
      },
      {
        type: "input",
        name: "description",
        message: "Please enter a brief description of your project."
      },
      {
        type: "input",
        name: "installation",
        message: "Please enter the installation instructions for your project."
      },
      {
        type: "input",
        name: "usage",
        message: "Please enter the usage instructions for your project."
      },
      {
        type: "input",
        name: "license",
        choices: ["MIT", "MPL 2.0", "Apache 2.0", "GNU GPLv3", "BSD 3--clause", "The Unlicense", "Boost 1.0", "ISC", "AGPLv3"]
      },
      {
        type: "input",
        name: "contribution",
        message: "Please enter the contribution guidelines for your project."
      },
      {
        type: "input",
        name: "usage",
        message: "Please enter any testing instructions for your project."
      },
      {
        type: "input",
        name: "username",
        message: "Please enter your GitHub username."
      },
      {
        type: "input",
        name: "email",
        message: "Please enter your email address."
      },
];
    
// A function to initialize the program
const promptUser = () => inquirer.prompt(questions);

async function init() {
    console.log("Running function init() ...");

    try {
        const answers = await promptUser();

        await writeFileAsync("README.md", generateMarkdown(answers));

        console.log("Succesfully wrote to README.md!");
    } catch(e) {
        console.log(e);
    }
}

// A function call to initialize the program
init();