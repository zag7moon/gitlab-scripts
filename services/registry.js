const client = require('../axios')

const removeRegistry = async (projectId, repId, tag) => {
  try {
    return await client.delete(`/projects/${projectId}/registry/repositories/${repId}/tags/${tag}`)
  } catch (e) {
    console.error('Failed while removing project tag', e)
  }
}

const getRegistries = async (projectId, repId) => {
  try {
    return await client.get(`/projects/${projectId}/registry/repositories/${repId}/tags`)
  } catch (e) {
    console.error('Failed while getting registries', e)
  }
}

const getRepositories = async (projectId) => {
  try {
    return await client.get(`/projects/${projectId}/registry/repositories`)
  } catch (e) {
    console.error('Failed while getting repositories', e)
  }
}

module.exports = {
  removeRegistry,
  getRepositories,
  getRegistries
}