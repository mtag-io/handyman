import GitHub from 'github-api'
import {checkRootPackage, extractPackages, initRootPackage, searchUp, warningEvents, writeHMConf} from 'common/server'
import {flushProps, omit} from 'common/global'
import {Environment, Package} from '../index.mjs'
import {DEFAULT_HM_CONFIG} from 'common/config'
import {ENVIRONMENT} from 'common/constants'

/**
 * @class Project
 */
class Project {

    /**
     * @param {ProjectOpts} opts
     */
    constructor(opts = {}) {

        const warnings = opts.warnings || warningEvents
        this._registerWarnings(warnings)

        const {root, conf} = searchUp()
        if (!checkRootPackage(root))
            initRootPackage(root)

        if (conf) {
            this._digest({
                ...DEFAULT_HM_CONFIG,
                ...conf
            })
        } else {
            const packages = extractPackages(root)
            this._digest({
                ...DEFAULT_HM_CONFIG,
                packages
            })
        }
        this._env = opts.environment || new Environment({...opts, root, warnings})
        this._gh = opts.github || new GitHub({...opts, warnings, enironment: this._env})

        this.writeHmConfig = this.writeHmConfig.bind(this)
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

    set name(name) {
        this._rootPackage.name = name
    }

    set description(description) {
        this._rootPackage.description = description
    }

    set version(version) {
        this._rootPackage.version = version
    }

    _digest(hmConf) {

        const _tmp = {...DEFAULT_HM_CONFIG, ...omit(hmConf, 'packages')}

        Object.entries(_tmp).forEach(
            ([k, v]) => {
                this[k] = v
            })
        this._packages = hmConf.packages.map(
            pkData => new Package(pkData)
        )
        this._rootPackage = this._packages.filter(pk => pk.isRoot)[0]
    }


    _flushPackages() {
        return this._packages.map(pkInst => flushProps(pkInst))
    }

    flush() {
        return {
            ...flushProps(this),
            packages: this._flushPackages()
        }
    }

    writeHmConfig() {
        writeHMConf(this.root, this.flush())
    }

    _registerWarnings(warning) {
        if (!this.warningQueue) this.warningQueue = []
        warning.on(ENVIRONMENT, err => {
            this.warningQueue.push(err)
        })
    }

    _updatePkgJson() {
        this._packages.forEach(
            pk => {
                pk.updatePkgJson()
            }
        )
    }

    update(payload) {
        this._digest(payload)
        this.writeHmConfig()
        this._updatePkgJson()
    }
}

export default Project