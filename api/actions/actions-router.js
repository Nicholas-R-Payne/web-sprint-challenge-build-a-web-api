// Write your "actions" router here!
const express = require('express')

const Action = require('./actions-model')

const router = express.Router()

router.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack
    })
})

module.exports = router;