const client = require('../axios')

const getProjectUsers = async (id) => {
  try {
    return await client.get(`/projects/${id}/users`)
  } catch (e) {
    console.error('Failed while fetching project Users', e)
  }
}

const removeUser = async (projectId, userId) => {
  try {
    return await client.delete(`/projects/${projectId}/members/${userId}`)
  } catch (e) {
    console.error('Failed while removing users', e)
  }
}


module.exports = {
  getProjectUsers,
  removeUser
}