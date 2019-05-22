const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const allowCors = require('./cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)

app.listen(port, () => 
    console.log(`O servidor está rodando na porta ${port}`)
)

module.exports = app