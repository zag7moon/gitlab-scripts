const {addUser} = require('../../services/project')

module.exports = async (projectId, userId, accessLevel) => {
  const response = await addUser(projectId, userId, accessLevel);

  return response.data;
}