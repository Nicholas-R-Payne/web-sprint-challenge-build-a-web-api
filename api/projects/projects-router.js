// Write your "projects" router here!
const express = require('express')

const { validateProjectId } = require('./projects-middleware')

const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => {
            res.status(500).json({
                message: "The projects information could not be retrieved",
                err: err.message,
                stack: err.stack
            })
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', (req, res) => {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({
            message: "Please provide name and description for the project"
        })
    } else {
        Project.insert(req.body)
            .then(projects => {
                res.status(201).json(projects)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the project to the database",
                    err: err.message,
                    stack: err.stack
                })
            })
    }
})

module.exports = router;