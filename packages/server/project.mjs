import {join, dirname} from 'path'
import {writeFileSync, existsSync} from 'fs'
import {HM_CACHE, DEFAULT_DESCRIPTION, DEFAULT_VERSION} from '__common__/config'

class Project {
    constructor(pData) {
        if(!pData.name)
            throw new Error('Project name is required')
        if(!pData.version)
            pData.version = DEFAULT_VERSION
        if(!pData.description)
            pData.description = DEFAULT_DESCRIPTION
        this._pData = pData
    }

    get data() {
        return this._pData
    }

    init() {
        if(!existsSync(dirname(this._pData.path)))
            throw new Error('Path not found')
        const pth = join(this._pData.path, HM_CACHE)
        try {

            writeFileSync(pth, JSON.stringify(this._pData, null, 4))
        } catch(err){
            throw new Error(`Error couldn't write ${HM_CACHE} file in ${pth}`)
        }
    }
}

export default Project