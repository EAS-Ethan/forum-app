require('dotenv').config()
const express = require('express')
const routes = require('./routes.js')
const { initialise } = require('./helpers/db.js')
const { validateBearerTokenMiddleware } = require('./helpers/auth.js')


const app = express()
const http = require('http').createServer(app)
app.use(express.json());
const public = express.Router()
const private = express.Router()

private.use(validateBearerTokenMiddleware)

initialise()

routes.public.map(({ path, handler, method }) => {
    public[method](path, (req, res) => {
        try {
            handler(req, res)
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    })

})

routes.private.map(({ path, handler, method }) => {
    private[method](path, (req, res) => {
        try {
            handler(req, res)
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    })

})

app.use(public)
app.use(private)

http.listen(80)