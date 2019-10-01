const processFlag = process.argv[2];

const inquirer = require("inquirer");
const chalk = require("chalk");
const gradient = require('gradient-string');
const figlet = require("figlet");
const parseArgs = require('minimist')(process.argv.slice(3));

const {types, accessLevels} = require('./config');
const {removeUserFromGroupProjectsCli} = require('./features/removeUserFromGroupProjects')
const {createNewProjectCli, createNewProject} = require('./features/createNewProject');
const {addUserToProjectCli, addUserToProject} = require('./features/addUserToProject');
const {keepNContainersCli} = require('./features/keepNContainers');
const {getUsersByUsername} = require('./services/project');

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
    choices: ["Удаление пользователя", "Создание репозитория", "Добавить пользователя в репозиторий", "Очистить ненужные контейнеры"]
  });

  switch (ACTION_TYPE) {
    case 'Удаление пользователя':
      return removeUserFromGroupProjectsCli();

    case 'Создание репозитория':
      return createNewProjectCli();

    case 'Добавить пользователя в репозиторий':
      return addUserToProjectCli();
    
    case 'Очистить ненужные контейнеры':
      return keepNContainersCli();
  }

};

const runWithArgs = async () => {
  if (processFlag === 'create') {
    const response = await createNewProject(parseArgs.name, types[parseArgs.template]);

    const addUser = async (username, accessLevel) => {
      const user = await getUsersByUsername(username);
      addUserToProject(response.id, user.data[0].id, accessLevels[accessLevel]);
    }

    [accessLevels].forEach(accessLevel => {
      if (parseArgs[accessLevel]) {
        if (parseArgs[accessLevel].length) {
          parseArgs[accessLevel].forEach(async userName => addUser(userName, accessLevel))
        } else {
          addUser(parseArgs[accessLevel], accessLevel)
        }
      }
    })

  }
}

if (Object.keys(parseArgs).length === 1) {
  run();
} else {
  runWithArgs();
}
