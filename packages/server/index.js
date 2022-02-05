import dotenv from 'dotenv'
import express from'express'
import cors from'cors'
import kill from 'kill-port'
import {CLIENT_PORT} from '__common__/config'

dotenv.config()
const app = express()
app.use(cors({origin: '*'}))

const PORT = process.env.BACK_PORT

// shutdown Handyman
app.get('/shutdown', () => {
    console.log("Shutting down the Handyman server...")
    kill(CLIENT_PORT,'tcp' )
    process.exit(0)
})

const bootstrap = () => {
    app.listen(PORT, () => {
        console.log(`Handyman server listening on ${PORT}`)
    })
}


bootstrap()