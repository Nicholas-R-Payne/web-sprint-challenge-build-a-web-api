// Write your "projects" router here!
const express = require('express')

const { validateProjectId, validateProjectBody } = require('./projects-middleware')

const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProjectBody, (req, res, next) => {
    Project.insert(req.body)
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(next)
})

router.put('/:id', validateProjectId, validateProjectBody, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

module.exports = router;