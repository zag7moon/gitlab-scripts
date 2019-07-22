const {getGroupProjects} = require('../services/group')
const {getProjectUsers, removeUser} = require('../services/project')

module.exports = async (username, groupId = 4076980) => {
  const perPage = 100
  let page = 1;
  let projects;
  do {
    const response = await getGroupProjects({id: groupId, page, perPage})
    projects = response.data
    for (const project of projects) {
      const { data: users } = await getProjectUsers(project.id)
      console.log(project.name)

      for (const user of users) {
        if (user.username === username) {
          await removeUser(project.id, user.id)
          console.log('Remove - OK')
        }
      }
    }
    page++;
  } while (projects.length === perPage)
  
}