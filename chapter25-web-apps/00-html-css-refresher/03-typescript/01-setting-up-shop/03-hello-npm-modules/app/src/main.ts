import * as inquirer from 'inquirer';
// import inquirer from 'inquirer'; /* this will work too */

inquirer.prompt(
  [
    {
      name: `first_name`,
      message: `What is your name?`
    }
  ]
).then(
  answers => {
    console.log(`you answered: ${answers.first_name}`);
  }
);
