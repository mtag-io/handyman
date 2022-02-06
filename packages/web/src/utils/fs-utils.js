import {basename, join} from 'path'
import {existsSync, statSync, readFileSync} from 'fs'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION, HM_CACHE, PACKAGES} from '__common__/config'

export const searchUp = pth => {
    let tmp = pth
    while (tmp !== '/') {
        const hmPath = join(tmp, HM_CACHE)
        const packPath = join(tmp, PACKAGES)
        if (existsSync(hmPath)) {
            const raw = readFileSync(hmPath, 'utf-8')
            return JSON.parse(raw)
        }
        if (existsSync(packPath) && statSync(packPath).isDirectory()) return {
            path: tmp,
            name: basename(tmp),
            description: DEFAULT_DESCRIPTION,
            version: DEFAULT_VERSION,
            newProject: true
        }
        tmp = join(tmp, '../')
    }
    return {
        error: true,
        message: 'No suitable project found'
    }
}