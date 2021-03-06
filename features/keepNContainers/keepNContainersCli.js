module.exports = async () => {
  const inquirer = require("inquirer");
  const {getRepositories, getRegistries, removeRegistry} = require('../../services/registry');

  const {PROJECT_ID} = await inquirer.prompt({type: "input", name: "PROJECT_ID", message: "Введите ID проекта"});

  const repository = await getRepositories(PROJECT_ID);
  const registries = await getRegistries(PROJECT_ID, repository.data[0].id);

  const getTime = str => parseInt(str.slice(str.indexOf('-') + 1));

  const sortedRegistries = registries.data.slice().sort((a, b) => getTime(b.name) - getTime(a.name));

  sortedRegistries.slice(3).forEach(registry => {
    removeRegistry(PROJECT_ID, repository.data[0].id, registry.name);
  });

  console.log('Конец');
}
