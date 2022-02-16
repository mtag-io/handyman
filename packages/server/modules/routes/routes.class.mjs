import express from 'express'
import {endpoints} from 'common/config'
import {GET, HOME_ROUTE} from 'common/constants'


class Routes {

    /**
     *
     * @param resolvers
     * @param {*} opts
     * @param {Endpoints?} opts.endpoints
     * @param {Express} opts.router
     */
    constructor(resolvers, opts={}) {
        this._routerEngine = opts.router || express.Router()
        this._endpoints = opts.endpoints || endpoints

        this._routes = Object.keys(endpoints).map(name => {
            const {path, route, method, resolver} = endpoints[name]
            const _method = method && method.toLowerCase() || GET.toLowerCase()
            return [
                route || HOME_ROUTE,
                this._routerEngine[_method](
                    path || HOME_ROUTE.concat(name),
                    resolvers[resolver || name]
                )
            ]
        })
    }

    register(app) {
        this._routes.forEach(rt => {
            app.use(...rt)
        })
    }
}

export default Routes