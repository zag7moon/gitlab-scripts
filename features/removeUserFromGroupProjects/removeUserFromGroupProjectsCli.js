module.exports = async () => {
  const inquirer = require('inquirer');
  const userProjects = require('./removeUserFromGroupProjects')

  const {USERNAME} = await inquirer.prompt({type: "input", name: "USERNAME", message: "Имя пользователя"});
  return await userProjects(USERNAME);
}
