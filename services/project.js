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

const addUser = async (projectId, user_id, access_level) => {
  try {
    return await client.post(`/projects/${projectId}/members/`, { user_id, access_level })
  } catch (e) {
    console.error('Failed while adding user', e)
  }
}

const getUsersByUsername = async (username) => {
  try {
    return await client.get(`/users/?username=${username}`)
  } catch (e) {
    console.error('Failed while getting users', e)
  }
}

const getProjectById = async (projectId) => {
  try {
    return await client.get(`/projects/${projectId}`)
  } catch (e) {
    console.error('Failed while getting project', e)
  }
}

const createProject = async (name, namespace_id, import_url, visibility) => {
  try {
    return await client.post('/projects/', { name, import_url, visibility, namespace_id })
  } catch (e) {
    console.error('Failed while trying to create project', e)
  }
}

module.exports = {
  getProjectUsers,
  removeUser,
  addUser,
  getUsersByUsername,
  getProjectById,
  createProject
}