import {empty} from './object.mjs'

export const flushProps = inst => {
    return Object.keys(inst).reduce((acc, k) => {
        if(typeof inst[k] !== 'function') acc[k] = inst[k]
        return acc
    }, {})
}

export const filterInstanceByProp = (o, filter) => {
    if (empty(filter)) return null
    const [filterKey, filterValue] = Object.entries(filter)[0]
    const match = Object.keys(o).filter(
        pk => {
            return o[pk].flush()[filterKey] === filterValue
        }
    )
    return match.length ? o[match[0]] : null
}
