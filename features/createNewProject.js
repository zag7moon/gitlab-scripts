const {createProject} = require('../services/project')

module.exports = async (projectName, copyFrom) => {
  const response = await createProject(projectName, copyFrom)

  if (response) {
    console.log(response.data);
  }
}