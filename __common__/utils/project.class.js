import {basename, dirname} from 'path'
import {searchUp} from './fs-utils.js'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION, HM_CACHE} from '../config.mjs'
import {readFileSync} from 'fs'
import {UTF8} from '../constants.mjs'

class Project{
    constructor(init) {
        if(typeof init === "string")
            this.scan(init)
        this._projectData = init
    }

    scan(init){
        const _tmp = searchUp(init)
        if(basename(_tmp === HM_CACHE)){
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
                name: basename(dirname(init)),
                path: dirname(init),
                description: DEFAULT_DESCRIPTION,
                version: DEFAULT_VERSION
            }
        }
    }

    deepScan(){
        
    }

    get data(){
        return this._projectData
    }
}

export default Project