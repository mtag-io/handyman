import {checkRootPackage, extractPackages, initRootPackage, searchUp, writeJson} from 'common/server'
import {filterInstanceByProp, flushProps} from 'common/global'
import {Environment, Package} from '../server.mjs'
import GitHub from 'github-api'

const DEFAULT_HM_CONFIG_KEYS = {
    'syncPackage': false
}

/**
 * @class Project
 */
class Project {

    /**
     * @param {ProjectOpts} opts
     */
    constructor(opts = {}) {

        // empty packages placeholder
        this._packages = {}

        // if a path is provided scan the new path
        // and generate the project out of the colected data
        if (opts.root)
            this.refresh(opts.root)

        // if HM configuration data is provided, just digest it
        if (opts.hmConf)
            this._digest(opts.hmConf)

        this.env = opts.environment || new Environment(this.root)
        this.gh = opts.github || new GitHub(opts)

        this.scan = this.scan.bind(this)
        this.routes = this.routes.bind(this)
        this.write = this.write.bind(this)
    }

    get root() {
        return this._rootPackage.path
    }

    get name() {
        return this._rootPackage.name
    }

    get description() {
        return this._rootPackage.description
    }

    get version() {
        return this._rootPackage.version
    }

    _digest(hmConf = {}) {
        const {packages, ...keys} = DEFAULT_HM_CONFIG_KEYS
        Object.keys(keys).forEach(k => {
            this[k] = hmConf[k] || DEFAULT_HM_CONFIG_KEYS[k]
        })
        packages.forEach(
            pkData => this._packages[pkData.name] = new Package(pkData)
        )

        this._rootPackage = filterInstanceByProp({isRoot: true})
    }

    refresh(root) {
        const realRoot = searchUp(root)
        if (!checkRootPackage(realRoot))
            initRootPackage(realRoot)
        this._digest({
            ...DEFAULT_HM_CONFIG_KEYS,
            packages: extractPackages(realRoot)
        })
    }

    _flushPackages() {
        return Object.values(this._packages).map(pkInst => flushProps(pkInst))
    }

    flush() {
        return {
            ...flushProps(this),
            packages: this._flushPackages()
        }
    }

    writeHmConfig() {
        writeJson(this.root, this.flush())
    }
}

export default Project