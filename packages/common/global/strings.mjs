/**
 * @param {string} st
 * @param {string[]} subStrings
 * @return {boolean}
 */
import {SEP} from 'common/constants'

/**
 * @param {string} st
 * @return {string}
 */
export const capitalize = st => st[0].toUpperCase().concat(st.slice(1))

export const includeSubStrings = (st, subStrings) => subStrings.some(s => st.includes(s))

/**
 * @param {string} st
 * @returns {string}
 */
export const stripSepLeft = st => {
    while (st[0] === SEP)
        st = st.slice(1)
    return st
}

/**
 * @param {string} st
 * @returns {string}
 */
export const stripSepRight = st => {
    while (st[st.length - 1] === SEP)
        st = st.slice(0, -1)
    return st
}

/**
 * @param {string} st
 * @returns {string}
 */
export const cleanSep = st => {
    const doubleSep = /\/\//g
    while (doubleSep.test(st)) {
        st = st.replace(doubleSep, SEP)
    }
    return st
}

/**
 * @description url concatenation utility
 * @param {...string} args
 * @returns {string}
 */

export const urlAdd = (...args) =>{
    const pth = args.map((_p, idx) => {
            if (idx) _p = stripSepLeft(_p)
            _p = stripSepRight(_p)
            return _p
        }).join(SEP)
    return cleanSep(pth)
}