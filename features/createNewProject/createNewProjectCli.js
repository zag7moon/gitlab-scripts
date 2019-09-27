module.exports = async () => {
  const {types} = require('../../config');
  const inquirer = require("inquirer");
  const {createNewProject} = require('./');

  const createCustomProject = async (name) => {
    const {PROJECT_URL} = await inquirer.prompt({type: "input", name: "PROJECT_URL", message: "Введите import_url"});

    return await createNewProject(name, PROJECT_URL)
  }

  const {PROJECT_NAME} = await inquirer.prompt({type: "input", name: "PROJECT_NAME", message: "Имя проекта"});
  const {PROJECT_TYPE} = await inquirer.prompt({
    type: "list",
    name: "PROJECT_TYPE",
    message: "Проект",
    choices: ["vue", "react", "django", "custom"]
  });

  let response;

  if (PROJECT_TYPE === types.custom) {
    response = await createCustomProject(PROJECT_NAME);
  } else {
    response = await createNewProject(PROJECT_NAME, types[PROJECT_TYPE]);
  }

  console.log('Ваша ссылка евгений', `https://gitlab.com/${response.path_with_namespace}`);
}