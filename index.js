// Declare dependencies.
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const generateMarkdown = require("./utils/generateMarkdown.js");
const writeFileAsync = util.promisify(fs.writeFile);

// An array containing inquirer questions the user will be asked to answer.
const questions = [
  {
    type: "input",
    name: "title",
    message: "Please enter a title for your project.",
    validate: genericValidation,
  },
  {
    type: "input",
    name: "description",
    message: "Please enter a brief description of your project.",
    validate: genericValidation,
  },
  {
    type: "input",
    name: "installation",
    message: "Please enter the installation instructions for your project.",
    validate: genericValidation,
  },
  {
    type: "input",
    name: "usage",
    message: "Please enter the usage instructions for your project.",
    validate: genericValidation,
  },
  {
    type: "list",
    name: "license",
    message: "Please select a license from the list below.",
    choices: [
      "MIT",
      "MPL 2.0",
      "Apache 2.0",
      "GNU GPLv3",
      "BSD 3--clause",
      "The Unlicense",
      "Boost 1.0",
      "ISC",
      "AGPLv3",
    ],
  },
  {
    type: "input",
    name: "contribution",
    message: "Please enter the contribution guidelines for your project.",
    validate: genericValidation,
  },
  {
    type: "input",
    name: "tests",
    message: "Please enter any testing information for your project.",
    validate: genericValidation,
  },
  {
    type: "input",
    name: "username",
    message: "Please enter your GitHub username.",
    validate: gitHubValidation,
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your email address.",
    validate: emailValidation,
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
  } catch (e) {
    // Prints a generic inquirer message to the console if promptUser encounters an error.
    console.log(e);
  };
};

// Generic validation to check that the user does not leave a question blank. Reprints the question to the console if validation is failed.
function genericValidation(value) {
  if (value != "") return true;
  else return "This section can not be left blank.";
}

// Confirms that the user entered a valid GitHub username.
async function gitHubValidation(value) {
    const queryUrl = `https://api.github.com/users/${value}`;
    try {
     const response = await axios.get(queryUrl);
      if (response.status === 200) return true;
    } catch (error) {
        return "Please enter a valid GitHub Username.";
    };
};

// Confirms that the user entered a valid email address.
function emailValidation(value) {
  const mailformat = /\S+@\S+\.\S+/;
  if (value.match(mailformat)) return true;
  else return "Please enter a valid email address.";
};

// A function call to initialize the program.
init();