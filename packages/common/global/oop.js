import {empty} from './object.mjs'
import {UNDERSCORE} from 'common/constants'

export const flushProps = inst => {
    return Object.keys(inst).reduce((acc, k) => {
        if(typeof inst[k] !== 'function' && k[0] !== UNDERSCORE) acc[k] = inst[k]
        return acc
    }, {})
}

export const filterInstanceByProp = (o, filter) => {
    if (empty(filter)) return null
    const [filterKey, filterValue] = Object.entries(filter)[0]
    const match = Object.keys(o).filter(
        pk => {
            return o[pk][filterKey] === filterValue
        }
    )
    return match.length ? o[match[0]] : null
}
