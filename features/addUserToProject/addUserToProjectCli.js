module.exports = async (projectId) => {
  const inquirer = require("inquirer");
  const {addUserToProject} = require('./');
  const {getUsersByUsername, getProjectById} = require('../../services/project');
  const {accessLevels} = require('../../config');
  const chalk = require('chalk');

  let PROJECT_ID = projectId;

  if (!PROJECT_ID) {
    PROJECT_ID = await inquirer.prompt({type: "input", name: "PROJECT_ID", message: "Введите ID проекта"}).PROJECT_ID;
  }

  const {USERNAME} = await inquirer.prompt({type: "input", name: "USERNAME", message: "Введите username"});
  const {ACCESS_LEVEL} = await inquirer.prompt({
    type: "list",
    name: "ACCESS_LEVEL",
    message: "Введите уровень доступа",
    choices: ["Guest", "Reporter", "Developer", "Maintainer"]
  });

  const users = await getUsersByUsername(USERNAME);
  const project = await getProjectById(PROJECT_ID);

  if (!users.data.length) {
    console.log(`Юзер ${chalk.blue(USERNAME)} не найден`)
  } else {
    await addUserToProject(PROJECT_ID, users.data[0].id, accessLevels[ACCESS_LEVEL]);
  }

  console.log(`Пользователь ${chalk.blue(USERNAME)} добавлен в репозиторий ${chalk.blue(project.data.name)} со статусом ${chalk.bgMagenta(ACCESS_LEVEL)}`);
}