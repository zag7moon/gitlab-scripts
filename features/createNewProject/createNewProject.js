const {createProject} = require('../../services/project')

module.exports = async (projectName, namespace_id, copyFrom, visibility) => {
  const response = await createProject(projectName, namespace_id, copyFrom, visibility)

  return response.data;
}