// noinspection JSCheckFunctionSignatures

import {BASE_HEADERS, endpoints, LOCAL_URL} from 'common/config'
import {DOT, GET, SEP} from 'common/constants'
import {cleanSep, toHttpVerb, urlAdd} from 'common/global'
import {encode} from 'querystring'

/**
 * @class Http
 */
class Http {
    /**
     * @param _endpoints
     */
    constructor(_endpoints = endpoints) {
        this.endpoints = _endpoints
    }

    _solve(selector) {
        const _tmp = {}
        //extract the endpoint name and the resolver from the selector
        const [name, resolverName] = selector.split(DOT)

        //if an undefined endpoint has been invoked throw an error
        if (!this.endpoints[name])
            throw new Error(`No ${name} defined endpoint found.`)

        const ep = this.endpoints[name]

        // initialize the base path
        _tmp.path = cleanSep(SEP.concat(ep.route || name))

        if (!resolverName) {
            _tmp.path = cleanSep(SEP.concat(ep.route || name))
            _tmp.method = ep.method || GET
            _tmp.method = _tmp.method.toUpperCase()
            return _tmp
        }
        //if an undefined resolver has been invoked throw an error
        if (!ep.resolvers || !ep.resolvers[resolverName])
            throw new Error(`No ${resolverName} defined on the ${name} endpoint.`)

        const resolver = ep.resolvers[resolverName]

        // if resolver specific path is required
        if (resolver.path)
            _tmp.path = urlAdd(_tmp.path, resolver.path)

        _tmp.method = toHttpVerb(ep.method || resolver.method || resolverName)

        return _tmp
    }

    /**
     * @param {string} selector
     * @param {object?} opts
     * @param {string?} opts.baseUrl
     * @param {object?} opts.headers
     * @param {string|number?} opts.param
     * @param {object?} opts.query
     * @param {function?} opts.fetch
     * @return {Promise<{object}>}
     */
    async server(selector, opts= {}) {
        let {path, method} = this._solve(selector)
        if (opts.param) path += SEP.concat(opts.param)
        if (opts.query) path += '?'.concat(encode(opts.query))
        const url = LOCAL_URL.concat(path)
        try {
            const raw = opts.fetch
                ? await opts.fetch(url, {
                    method,
                    headers: {
                        ...BASE_HEADERS,
                        ...opts.headers
                    }
                })
                : await fetch(url, {
                    method,
                    headers: {
                        ...BASE_HEADERS,
                        ...opts.headers
                    }
                })
            if (raw.ok) return await raw.json()
            return {
                error: true,
                code: raw.statusText,
                message: `Http error`
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                code: err.code,
                message: err.message
            }
        }
    }

    /**
     * @param {string} selector
     * @param {object?} opts
     * @param {string?} opts.baseUrl
     * @param {object?} opts.headers
     * @param {string|number?} opts.param
     * @param {object?} opts.query
     * @param {object?} opts.body
     * @param {*} opts.setData
     * @param {*} opts.setError
     * @param {*?} opts.setLoader
     * @param {function?} opts.fetch
     * @return {Promise<{object}>}
     */
    async client(selector, opts = {}) {

        let {path, method} = this._solve(selector)

        if (opts.param) path += SEP.concat(opts.param)
        if (opts.query) path += '?'.concat(encode(opts.query))

        if (!opts.setError)
            console.warn('No error handler specified')
        const url = opts.baseUrl
            ? opts.baseUrl.concat(path)
            : LOCAL_URL.concat(path)

        const _payload = {
            method,
            headers: {
                ...BASE_HEADERS,
                ...opts.headers
            }
        }

        if (opts.body) {
            if (_payload.method === GET)
                console.warn(`GET request should nod have body. (${selector})`)
            else _payload.body = JSON.stringify(opts.body)
        }

        if (opts.setLoader) opts.setLoader(true)

        try {
            const raw = opts.fetch
                ? await opts.fetch(url, _payload)
                : await fetch(url, _payload)
            if (opts.setLoader) opts.setLoader(false)
            if (raw.ok) {
                const data = await raw.json()
                return opts.setData ? opts.setData(data) :data
            }
            if (opts.setError)
                opts.setError({
                    error: true,
                    code: raw.status,
                    message: raw.statusText
                })
            else
                console.warn(`HTTP ERROR: ${raw.statusText}`)
        } catch (err) {
            if (opts.setError) opts.setError({
                error: true,
                code: 500,
                message: JSON.stringify(err)
            })
        }
    }
}

export default Http