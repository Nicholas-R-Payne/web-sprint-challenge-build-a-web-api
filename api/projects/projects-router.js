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

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack
    })
})

module.exports = router;