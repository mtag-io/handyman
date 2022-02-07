import {basename, join} from 'path'
import {existsSync, readFileSync, statSync} from 'fs'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION, HM_CACHE, PACKAGES} from '__common__/config.mjs'

/**
 * @param {string} pth
 * @return {string}
 */
export const searchUp = pth => {
    let tmp = pth
    while (tmp !== '/') {
        const hmPath = join(tmp, HM_CACHE)
        const packPath = join(tmp, PACKAGES)
        if (existsSync(hmPath))
            return hmPath
        if (existsSync(packPath) && statSync(packPath).isDirectory())
            return packPath
        tmp = join(tmp, '../')
    }
    return ''
}