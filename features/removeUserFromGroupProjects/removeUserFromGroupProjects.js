const {getGroupProjects} = require('../../services/group')
const {getProjectUsers, removeUser} = require('../../services/project')
const ora = require('ora');

module.exports = async (username, groupId = 4076980) => {
  const perPage = 100
  let page = 1;
  let projects;

  const spinner = ora({ discardStdin: false, text: 'Loading', spinner: 'arc' }); // TODO Оставляю так, но евгений переделает

  do {
    spinner.start('Загрузка проектов');

    const response = await getGroupProjects({id: groupId, page, perPage})

    spinner.succeed('Проекты загружены');

    projects = response.data
    for (const project of projects) {
      spinner.start(project.name);
      const { data: users } = await getProjectUsers(project.id)
      spinner.succeed(project.name);

      for (const user of users) {
        if (user.username === username) {
          await removeUser(project.id, user.id)
        }
      }
    }
    page++;
  } while (projects.length === perPage)
 
  spinner.stop();
}