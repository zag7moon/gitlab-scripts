const inquirer = require("inquirer");
const chalk = require("chalk");
const gradient = require('gradient-string');
const figlet = require("figlet");

const {removeUserFromGroupProjectsCli} = require('./features/removeUserFromGroupProjects')
const {createNewProjectCli} = require('./features/createNewProject');
const {addUserToProjectCli} = require('./features/addUserToProject');

const cliPreview = () => {
  console.log(chalk.blue('■'.repeat(55)));
  console.log(' '.repeat(55));
  console.log(
    gradient.vice(figlet.textSync("SIBDEV cli", {
      font: "big",
      horizontalLayout: "default",
      verticalLayout: "default"
    }))
  );
  console.log(chalk.blue('■'.repeat(55)));
}

const run = async () => {
  cliPreview();

  const {ACTION_TYPE} = await inquirer.prompt({
    type: "list",
    name: "ACTION_TYPE",
    message: "Действие: ",
    choices: ["Удаление пользователя", "Создание репозитория", "Добавить пользователя в репозиторий"]
  });

  switch (ACTION_TYPE) {
    case 'Удаление пользователя':
      return removeUserFromGroupProjectsCli();

    case 'Создание репозитория':
      return createNewProjectCli();

    case 'Добавить пользователя в репозиторий':
      return addUserToProjectCli();
  }
};

run();
