const client = require('../axios')

const getGroups = async () => {
  try {
    return await client.get('/groups')
  } catch (e) {
    console.error('Failed while groups fetching', e)
  }
}

const getSubgroups = async (id) => {
  try {
    return await client.get(`/groups/${id}/subgroups`)
  } catch (e) {
    console.error('Failed while subgroups fetching', e)
  }
}

const getGroupProjects = async (id) => {
  try {
    return await client.get(`/groups/${id}/projects`)
  } catch (e) {
    console.error('Failed while group projects fetching', e)
  }
}

module.exports = {
  getGroups,
  getGroupProjects,
  getSubgroups
}