module.exports = async () => {
  const inquirer = require("inquirer");
  const {getRepositories, getRegistries, removeRegistry} = require('../../services/registry');

  const {PROJECT_ID} = await inquirer.prompt({type: "input", name: "PROJECT_ID", message: "Введите ID проекта"});

  const repository = await getRepositories(PROJECT_ID);
  const registries = await getRegistries(PROJECT_ID, repository.data[0].id);

  const registriesTimestamps = registries.data
    .map(registry => parseInt(registry.name.slice(registry.name.indexOf('-') + 1)))
    .sort((a, b) => b - a);
  const sortedRegistries = registriesTimestamps
    .map(timestamp => registries.data.find(registry => registry.name.includes(timestamp)));

  sortedRegistries.slice(3).forEach(registry => {
    removeRegistry(PROJECT_ID, repository.data[0].id, registry.name);
  });

  console.log('Конец');
}
