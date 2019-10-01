const {createProject} = require('../../services/project')

module.exports = async (projectName, namespace, copyFrom, visibility) => {
  const response = await createProject(projectName, namespace, copyFrom, visibility)

  return response.data;
}