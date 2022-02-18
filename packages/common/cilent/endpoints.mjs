import {endpoints} from 'common/config'
import {DELETE, DOT, GET, POST, PUT, SEP} from '../constants/index.mjs'
import {cleanSep, urlAdd} from '../global/strings.mjs'

export const solveEndpoint = (epSelector, _endpoints = endpoints) => {
    const _tmp = {}
    //extract the endpoint name and the resolver from the selector
    const [name, resolverName] = epSelector.split(DOT)

    //if an undefined endpoint has been invoked throw an error
    if(!_endpoints[name])
        throw new Error(`No ${name} defined endpoint found.`)

    const ep = _endpoints[name]

    // initialize the base path
    _tmp.path = cleanSep(SEP.concat(ep.route || name))

    if(!resolverName) {
        _tmp.path = cleanSep(SEP.concat(ep.route || name))
        _tmp.method = ep.method || GET
        _tmp.method = _tmp.method.toUpperCase()
        return _tmp
    }

    //if an undefined resolver has been invoked throw an error
    if(!ep.resolvers || !ep.resolvers[resolverName])
        throw new Error(`No ${resolverName} defined on the ${name} endpoint.`)

    const resolver = ep.resolvers[resolverName]

    // if resolver specific path is required
    if(resolver.path)
        _tmp.path = urlAdd(_tmp.path, resolver.path)

    _tmp.method = ep.method || resolver.method || resolverName || GET
    if(![GET, POST, DELETE, PUT].map(s => s.toLowerCase() ).includes(_tmp.method.toLowerCase()))
        throw new Error(`Method or resolver name is not a HTTP verb.`)
    _tmp.method = _tmp.method.toUpperCase()

    return _tmp
}