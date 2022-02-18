import express from 'express'
import {endpoints} from 'common/config'
import {spreadEndpoint} from 'common/server'


class Routes {

    /**
     *
     * @param resolvers
     * @param {*} opts
     * @param {Endpoints?} opts.endpoints
     * @param {Express} opts.router
     */
    constructor(resolvers, opts = {}) {
        this._routerEngine = opts.router || express.Router()
        this._endpoints = opts.endpoints || endpoints

        this._routes = spreadEndpoint(this._endpoints).map(
            enpointPayload =>
                [
                    enpointPayload.route,
                    this._routerEngine[enpointPayload.method](
                        enpointPayload.path,
                        resolvers[enpointPayload.resolver]
                    )
                ]
        )
    }

    register(app) {
        this._routes.forEach(rt => {
            app.use(...rt)
        })
    }
}

export default Routes