const express = require('express');
const helmet = require('helmet');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const projectsRouter = require('./projects/projects-router')

server.use(express.json())

server.use(helmet())

server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send('Server is working!')
})

module.exports = server;
