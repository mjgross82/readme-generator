// Declare dependencies.
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown.js");
const writeFileAsync = util.promisify(fs.writeFile);

// An array container inquirer questions the user will be asked to answer.
const questions = [
    {
        type: "input",
        name: "title",
        message: "Please enter a title your project."
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
        name: "tests",
        message: "Please enter any testing information for your project."
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
    
// A function that will prompt the user with a series of inquirer questions defined in the array questions.
const promptUser = () => inquirer.prompt(questions);

// An asynchronous function that will return the users answers to the inquirer questions in array questions, and pass them to ./utils/generateMarkdown.js, which will use them to create the README.md.
async function init() {
    console.log("Running function init() ...");

    try {
        const answers = await promptUser();

        await writeFileAsync("README.md", generateMarkdown(answers));

        console.log("Succesfully wrote to README.md!");
    }
    // Prints a generic inquirer message to the console if promptUser finds an error.
    catch(e) {
        console.log(e);
    }
}

// A function call to initialize the program.
init();