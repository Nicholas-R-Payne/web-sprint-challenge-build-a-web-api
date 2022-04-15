// Write your "projects" router here!
const express = require('express')

const Project = require('./projects-model.js')

const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

module.exports = router;