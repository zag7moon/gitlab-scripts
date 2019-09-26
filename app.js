const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const {removeUserFromGroupProjectsCli} = require('./features/removeUserFromGroupProjects')
const {createNewProjectCli} = require('./features/createNewProject');

const run = async () => {
  console.log(
    chalk.blue(
      figlet.textSync("hrchat cli", {
        font: "banner",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );

  const {ACTION_TYPE} = await inquirer.prompt({
    type: "list",
    name: "ACTION_TYPE",
    message: "Действие: ",
    choices: ["Удаление пользователя", "Создание репозитория"]
  });

  switch (ACTION_TYPE) {
    case 'Удаление пользователя':
      return removeUserFromGroupProjectsCli();

    case 'Создание репозитория':
      return createNewProjectCli();
  }
};

run();
