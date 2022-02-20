import {checkRootPackage, initRootPackage, searchUp, writeHMConf} from 'common/server'
import {filterInstanceByProp, flushProps} from 'common/global'
import {Environment, Package} from '../index.mjs'
import GitHub from 'github-api'
import {extractPackages, warningEvents} from 'common/server'
import {DEFAULT_HM_CONFIG} from 'common/config'
import {omit} from 'common/global'
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

        this._packages = {}
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

    _digest(hmConf) {

        const packages = hmConf.packages
        const _tmp = {...DEFAULT_HM_CONFIG, ...omit(hmConf, 'packages')}

        Object.entries(_tmp).forEach(
            ([k, v]) => {
                this[k] = v
            })

        packages.forEach(
            pkData => this._packages[pkData.name] = new Package(pkData)
        )

        this._rootPackage = filterInstanceByProp(this._packages, {isRoot: true})
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
        writeHMConf(this.root, this.flush())
    }

    _registerWarnings(warning) {
        if(!this.warningQueue) this.warningQueue = []
        warning.on(ENVIRONMENT, err => {
            this.warningQueue.push(err)
        })
    }
}

export default Project