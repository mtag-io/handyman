// noinspection ES6PreferShortImport

import kill from 'kill-port'
import {CLIENT_PORT} from '../config/index.mjs'

export const hmShutdown = err => {
    console.log("Shutting down the Handyman server...")
    kill(CLIENT_PORT,'tcp' )
    setTimeout(() => {
        process.exit(err ? 1 : 0)
    }, 1000)
}