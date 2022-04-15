// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if (!project) {
            res.status(404).json({
                message: "The project with the specified ID does not exist"
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "The project information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
}

module.exports = {
    validateProjectId
}