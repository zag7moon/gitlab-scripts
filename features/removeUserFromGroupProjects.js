const {getGroupProjects} = require('../services/group')
const {getProjectUsers, removeUser} = require('../services/project')

module.exports = async (username, groupId = 4076980) => {
  const { data: projects } = await getGroupProjects(groupId)
  for (const project of projects) {
    const { data: users } = await getProjectUsers(project.id)

    for (const user of users) {
      if (user.username === username) {
        console.log(project.name)
        await removeUser(project.id, user.id)
        console.log('Remove - OK')
      }
    }
  }
}