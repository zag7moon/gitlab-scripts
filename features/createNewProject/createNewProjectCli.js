module.exports = async () => {
  const {types, namespace_id} = require('../../config');
  const inquirer = require("inquirer");
  const {addUserToProjectCli} = require('../addUserToProject');
  const {createNewProject} = require('./');

  const createCustomProject = async (name) => {
    const {PROJECT_URL} = await inquirer.prompt({type: "input", name: "PROJECT_URL", message: "Введите import_url"});

    return await createNewProject(name, PROJECT_URL)
  }

  const addUser = async (projectId) => {
    const {ADD_USER} = await inquirer.prompt({
      type: "list",
      name: "ADD_USER",
      message: "Хотите добавить в проект юзера?",
      choices: ["Да", "Нет"]
    });
  
    if (ADD_USER === "Да") {
      await addUserToProjectCli(projectId);
      return addUser();
    }
  }

  const {PROJECT_NAME} = await inquirer.prompt({type: "input", name: "PROJECT_NAME", message: "Имя проекта"});
  const {PROJECT_TYPE} = await inquirer.prompt({
    type: "list",
    name: "PROJECT_TYPE",
    message: "Проект",
    choices: Object.keys(types)
  });

  let response;

  if (PROJECT_TYPE === types.custom) {
    response = await createCustomProject(PROJECT_NAME, namespace_id);
  } else {
    response = await createNewProject(PROJECT_NAME, namespace_id, types[PROJECT_TYPE]);
  }

  console.log('Ваша ссылка:', `https://gitlab.com/${response.path_with_namespace}`);

  addUser(response.id);
}