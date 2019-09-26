const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

const userProjects = require('./features/removeUserFromGroupProjects/removeUserFromGroupProjects.js')

const createNewProject = require('./features/createNewProject/createNewProject');

const createCustomProject = async (name) => {
  const {PROJECT_URL} = await inquirer.prompt({type: "input", name: "PROJECT_URL", message: "Введите import_url"});

  return await createNewProject(name, PROJECT_URL)
}

const createProject = (name, type) => {
  switch (type) {
    case 'react':
      return createNewProject(name, 'https://github.com/SibdevPro/react-typescript-stub');

    case 'vue':
        return console.log('vue гавно даже ссылки нет');

    case 'django':
      return createNewProject(name, 'https://github.com/SibdevPro/backend-stub');

    case 'custom':
      return createCustomProject(name)
  }
}

const createRepository = async () => {
  const {PROJECT_NAME} = await inquirer.prompt({type: "input", name: "PROJECT_NAME", message: "Имя проекта"});
  const {PROJECT_TYPE} = await inquirer.prompt({
    type: "list",
    name: "PROJECT_TYPE",
    message: "Проект",
    choices: ["vue", "react", "django", "custom"]
  });

  const response = await createProject(PROJECT_NAME, PROJECT_TYPE);

  console.log('Ваша ссылка евгений', `https://gitlab.com/${response.path_with_namespace}`);
}

const removeUser = async () => {
  const {USERNAME} = await inquirer.prompt({type: "input", name: "USERNAME", message: "Имя пользователя"});
  return await userProjects(USERNAME);
}

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
      return removeUser();
    
    case 'Создание репозитория':
      return createRepository();
  }
};

run();
