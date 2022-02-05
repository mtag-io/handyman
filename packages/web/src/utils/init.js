import {basename, join} from 'path'
import {existsSync, statSync} from 'fs'
import {HM_CACHE, PACKAGES} from '../../../../__common__/config.mjs'


export const searchUp = pth => {
    let tmp = pth
    while (tmp !== '/') {
        const hmPath = join(tmp, HM_CACHE)
        const packPath = join(tmp, PACKAGES)
        if (existsSync(hmPath)) return require(hmPath)
        if (existsSync(packPath) && statSync(packPath).isDirectory()) return {
            init: tmp,
            name: basename(tmp)
        }
        tmp = join(tmp, '../')
    }
    return {
        error: 'Nothing'
    }
}