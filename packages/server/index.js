import dotenv from 'dotenv'
import express from'express'
import cors from'cors'
import kill from 'kill-port'
import {CLIENT_PORT, SERVER_PORT} from '__common__/config'
import projectRoutes from './project.route.mjs'

dotenv.config()
const app = express()

app.use(cors({origin: '*'}))
app.use(express.json())

const router = express.Router()
app.use('/project', projectRoutes(router))

// shutdown Handyman
app.get('/shutdown', () => {
    console.log("Shutting down the Handyman server...")
    kill(CLIENT_PORT,'tcp' )
    setTimeout(() => {
        process.exit(0)
    }, 500)
})

const bootstrap = () => {
    app.listen(SERVER_PORT, () => {
        console.log(`Handyman server listening on ${SERVER_PORT}`)
    })
}


bootstrap()