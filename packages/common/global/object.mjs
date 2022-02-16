/**
 * @desc returns true if "o" is empty (has no properties)
 * @param o
 * @return {boolean}
 */
export const notEmpty = o => !!o && Object.keys(o).length

/**
 * @desc returns true if "o" is not empty (has own properties)
 * @param o
 * @return {boolean}
 */
export const empty = o => !notEmpty(o)

/**
 * @desc Create a new object creating only the "picked"
 * args keys of "o"
 * @param {object} o
 * @param {...string | string[]} args
 * @return {object}
 */
export const pick = (o, ...args) => {
    if (!(o && Object.keys(o).length)) return o
    if (args[0] instanceof Array)
        args = [...args[0]]
    if (!args || !args.length) return o
    return args.reduce(
        (acc, key) => {
            acc[key] = o[key]
            return acc
        }, {})
}

/**
 * @desc Create a new object excluding from "o" the "ommited"
 * keys specified in "args"
 * @param {object} o
 * @param {...string | string[]} args
 * @return {object}
 */
export const omit = (o, ...args) => {
    if (!(o && Object.keys(o).length)) return o
    if (args[0] instanceof Array)
        args = [...args[0]]
    if (!args || !args.length) return o
    return Object.keys(o).reduce(
        (acc, key) => {
            if(!args.includes(key))
                acc[key] = o[key]
            return acc
        }, {})
}
