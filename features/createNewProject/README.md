# createNewProject(projectName, copyFrom, visibility)

projectName - **required**, **string**, name of the new project

copyFrom - **string**, where you copy your new project from. Creates empty project when not defined

visibility - **string**, grants visibility level. Grants 'private' when not defined

## List of visibility options

private: Project access must be granted explicitly for each user.
internal: The project can be cloned by any logged in user.
public: The project can be accessed without any authentication.