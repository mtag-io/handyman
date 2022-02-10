import dotenv from 'dotenv'
import express from'express'
import cors from'cors'
import kill from 'kill-port'
import {CLIENT_PORT, SERVER_PORT} from '__common__/config'
import {Project} from '__common__/modules/server'

dotenv.config()
const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())

const project = new Project()
const router = express.Router()
app.use('/project', project.routes(router))

// shutdown Handyman
app.get('/shutdown', () => {
    console.log("Shutting down the Handyman server...")
    kill(CLIENT_PORT,'tcp' )
    setTimeout(() => {
        process.exit(0)
    }, 1000)
})

const bootstrap = () => {
    app.listen(SERVER_PORT, () => {
        console.log(`Handyman server listening on ${SERVER_PORT}`)
    })
}


bootstrap()