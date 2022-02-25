import express from 'express'
import {endpoints} from 'common/config'
import {spreadEndpoint} from 'common/server'


class Routes {

    /**
     *
     * @param resolvers
     * @param {*} opts
     * @param {Route?} opts.endpoints
     * @param {Express.Router} opts.router
     */
    constructor(resolvers, opts = {}) {
        this._endpoints = opts.endpoints || endpoints

        this._routes = spreadEndpoint(this._endpoints).map(
            /**
             * @param {Route} ep
             */
            ep => {
                const router = express.Router()
                /**
                 * @param {Resolver} resolver
                 */
                ep.resolvers.forEach(_res => {
                    router[_res.method.toLowerCase()](
                        _res.path,
                        resolvers[_res.resolver]
                    )
                })
                return [
                    ep.route,
                    router
                ]
            }
        )
    }

    register(app) {
        this._routes.forEach(rt => {
            app.use(...rt)
        })
    }
}

export default Routes