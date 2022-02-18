import {DELETE, GET, HOME_ROUTE, POST, PUT, SEP} from 'common/constants'
import {endpoints} from 'common/config'
import {cleanSep, stripSepLeft} from '../global/index.mjs'
import {capitalize} from 'common/global'

export const spreadEndpoint = (_endpoints = endpoints) =>
    Object.entries(_endpoints).reduce(
        (acc, [endpointKey, endpointValue]) => {
            if (!endpointValue.resolvers) {
                const _tmp = {}
                _tmp.route = cleanSep(SEP.concat(endpointValue.route || endpointKey))
                _tmp.path = HOME_ROUTE
                _tmp.method = endpointValue.method || GET
                _tmp.method = _tmp.method.toUpperCase()
                if (![GET, POST, DELETE, PUT].map(s => s.toLowerCase()).includes(_tmp.method.toLowerCase()))
                    throw new Error(`Method or resolver name is not a HTTP verb.`)
                _tmp.method = _tmp.method.toUpperCase()
                _tmp.resolver = endpointKey
                acc.push(_tmp)
                return acc
            }
            Object.entries(endpointValue.resolvers).forEach(
                ([resolverKey, resolverValue]) => {
                    const _tmp = {}
                    _tmp.route = SEP.concat(stripSepLeft(endpointValue.route || endpointKey))
                    if (resolverValue.path)
                        _tmp.path = SEP.concat(stripSepLeft(resolverValue.path))
                    else _tmp.path = HOME_ROUTE
                    if (resolverValue.param)
                        _tmp.path = _tmp.path.concat(':', resolverValue.param)
                    _tmp.method = resolverValue.method || endpointValue.method || GET
                    _tmp.method = _tmp.method.toUpperCase()
                    _tmp.resolver = endpointKey.concat(capitalize(resolverKey))
                    acc.push(_tmp)
                })
            return acc

        }, []
    )