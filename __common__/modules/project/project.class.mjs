import {basename, dirname, join} from 'path'
import {searchUp} from '../../utils/fs-utils.js'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION, HM_CACHE} from '../../config.mjs'
import {existsSync, readFileSync, writeFileSync} from 'fs'
import {UTF8} from '../../constants.mjs'

class Project{
    constructor(init) {
        if(typeof init === "string")
            this.scan(init)
        else this._projectData = init
    }

    scan(init){
        const _tmp = searchUp(init)
        if(basename(_tmp) === HM_CACHE){
            try {
                const _raw = readFileSync(_tmp, UTF8)
                this._projectData = JSON.parse(_raw)
            } catch(err) {
                throw {
                    message: `Malformed ${HM_CACHE} file found.`,
                    code: 5002,
                    helper: 'Please delete the file and reinitialize the project'
                }
            }
        } else {
            this._projectData = {
                name: basename(dirname(_tmp)),
                path: dirname(_tmp),
                description: DEFAULT_DESCRIPTION,
                version: DEFAULT_VERSION,
                newProject: true
            }
        }
    }

    deepScan(){
        
    }

    get data(){
        return this._projectData
    }

    write(){
        if(!existsSync(dirname(this._projectData.path)))
            throw {
                message: `The project path (${this._projectData.path}) is invalid. Unable to write the write the ${HM_CACHE} file`,
                code: 5003,
                helper: 'Check the if path still exists'
            }
        const pth = join(this._projectData.path, HM_CACHE)
        try {
            writeFileSync(pth, JSON.stringify(this._projectData, null, 4))
        } catch(err){
            throw {
                message: `Couldn't write ${HM_CACHE} file in ${this._projectData.path}`,
                code: 5003,
                helper: 'Check the if path still exists or if your process has write permision in this specific location.'
            }
        }
    }
}

export default Project