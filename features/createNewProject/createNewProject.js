const {createProject} = require('../../services/project')

module.exports = async (projectName, copyFrom, visibility) => {
  const response = await createProject(projectName, copyFrom, visibility)

  console.log(response.data);
}