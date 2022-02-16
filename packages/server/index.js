import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import {SERVER_PORT} from 'common/config'
import {Project, resolvers, Routes} from './modules/index.mjs'
import {hmShutdown} from 'common/server'

dotenv.config()
const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())

const bootstrap = () => {
    app.listen(SERVER_PORT, () => {
        console.log(`Handyman server listening on ${SERVER_PORT}`)
    })
}

try {
    app.locals.project = new Project()
    const routes = new Routes(resolvers)
    routes.register(app)
    bootstrap()
} catch (err) {
    if(err instanceof Error)
        console.error(err)
    console.error(`ERROR: ${err.message}`)
    console.log(`CODE:${err.code}`)
    console.log(err.helper)
    hmShutdown(err.code)
}

