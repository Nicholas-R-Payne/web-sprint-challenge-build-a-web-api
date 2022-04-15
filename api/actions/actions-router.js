// Write your "actions" router here!
const express = require('express')

const { validateActionId, validateActionBody } = require('./actions-middleware')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateActionBody, (req, res, next) => {
    Action.insert(req.body)
        .then(actions => {
            res.status(201).json(actions)
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