import {basename, dirname, join} from 'path'
import {extractPackages, readJson, readPackage, searchUp, updatePackage, writeJson} from '../../utils/server/fs.mjs'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION, HM_CACHE} from '../../config.mjs'
import {existsSync} from 'fs'
import {PKG} from '../../constants.mjs'
import {pick} from '../../utils/global/object.mjs'

class Project {
    constructor(init) {
        if (typeof init === 'string')
            this.scan(init)
        if (init && init.name && init.path)
            this._projectData = init
        this.scan = this.scan.bind(this)
        this.routes = this.routes.bind(this)
        this.write = this.write.bind(this)
    }


    scan(init) {
        let _root = searchUp(init)
        if (basename(_root) === HM_CACHE) {
            try {
                this._projectData = readJson(_root)
            } catch (err) {
                throw {
                    message: `Malformed ${HM_CACHE} file found.`,
                    code: 5002,
                    helper: 'Please delete the file and reinitialize the project'
                }
            }
        } else {
            if (!this._projectData) this._projectData = {
                syncRootPkg: false,
                syncSubPkg: false
            }
            _root = dirname(_root)
            if (existsSync(join(_root, PKG))) {
                const pkg = readPackage(_root)
                this._projectData.name = pkg.name
                this._projectData.description = pkg.description || DEFAULT_DESCRIPTION
                this._projectData.version = pkg.version || DEFAULT_VERSION
                this._projectData.path = _root
                this._projectData.newProject = true
                this._projectData.hasRootPkg = true
            } else {
                this._projectData.name = basename(dirname(_root))
                this._projectData.path = dirname(_root)
                this._projectData.description = DEFAULT_DESCRIPTION
                this._projectData.version = DEFAULT_VERSION
                this._projectData.newProject = true
                this._projectData.hasRootPkg = false
            }
        }
        this.deepScan()
    }

    deepScan() {
        this._projectData.packages = extractPackages(this._projectData.path)
    }


    get data() {
        return this._projectData
    }

    set data(projectData) {
        this._projectData = projectData
    }


    write() {
        if (!existsSync(dirname(this._projectData.path)))
            throw {
                message: `The project path (${this._projectData.path}) is invalid. Unable to write the write the ${HM_CACHE} file`,
                code: 5003,
                helper: 'Check the if path still exists'
            }
        const pth = join(this._projectData.path, HM_CACHE)
        try {
            writeJson(pth, this._projectData)
        } catch (err) {
            throw {
                message: `Couldn't write ${HM_CACHE} file in ${this._projectData.path}`,
                code: 5003,
                helper: 'Check the if path still exists or if your process has write permision in this specific location.'
            }
        }
        if (this._projectData.syncRootPkg) this.syncRootPkg()
        if (this._projectData.syncSubPkg) this.syncSubPkg()
    }

    syncRootPkg() {
        try {
            updatePackage(
                this._projectData.path,
                pick(this._projectData, 'name', 'description', 'version'))
        } catch (err) {
            return err
        }
    }

    syncSubPkg() {
        this._projectData.packages.forEach(pack => {
            updatePackage(pack.path, pick(this._projectData, 'description', 'version'))
        })
    }

    routes(router) {
        router.post('/', (req, res) => {
            this.data = req.body
            try {
                this.write()
                res.status(200).send({success: true})
            } catch (err) {
                res.status(500).send(err)
            }
        })

        return router
    }
}

export default Project