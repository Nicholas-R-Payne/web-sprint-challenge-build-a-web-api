// add middlewares here related to actions
const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: "The action with the specified ID does not exist"
            })
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: "The action information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
}

module.exports = {
    validateActionId
}