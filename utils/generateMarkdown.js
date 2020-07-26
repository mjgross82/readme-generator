// A function to generate formatted markdown text and print it to README.md.
function generateMarkdown(data) {
    const linkLicense = data.license.replace(" ", "%20")
    return `# ${data.title}  
    ##  ![License: ${data.license}](https://img.shields.io/badge/License-${linkLicense}-informational?style=for-the-badge&logo=appveyor.svg)  
  ## Description  
  ${data.description}  
  ## Table of Contents  
  * [Installation](#installation)  
  * [Usage](#usage)  
  * [License](#license)  
  * [Contributing](#contributing)  
  * [Tests](#tests)  
  * [Questions](#questions)  
  ## Installation  
  ${data.installation}  
  ## Usage  
  ${data.usage}  
  ## License  
  This project is licensed under the ${data.license} license.  
  ## Contributing  
  ${data.contribution}  
  ## Tests  
  ${data.tests}  
  ## Questions  
  If you have any questions regarding this project, please contact me at:  
  GitHub: https://www.github.com/${data.username}  
  email: ${data.email}
  `;
  }
  
  module.exports = generateMarkdown;