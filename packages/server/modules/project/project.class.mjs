import {checkRootPackage, initRootPackage, searchUp, writeHMConf} from 'common/server'
import {filterInstanceByProp, flushProps} from 'common/global'
import {Environment, Package} from '../index.mjs'
import GitHub from 'github-api'
import {extractPackages, warningEvents} from 'common/server'
import {DEFAULT_HM_CONFIG} from 'common/config'
import {omit} from 'common/global'

/**
 * @class Project
 */
class Project {

    /**
     * @param {ProjectOpts} opts
     */
    constructor(opts = {}) {

        const warning = opts.warnings || warningEvents
        this._registerWarnings(warning)

        this._packages = {}
        const {root, isNew} = searchUp()
        if (!checkRootPackage(root))
            initRootPackage(root)

        if (!isNew) {
            const packages = extractPackages(root)
            this._digest({
                ...DEFAULT_HM_CONFIG,
                packages
            })
        }
        this.env = opts.environment || new Environment({root, warning})
        this.gh = opts.github || new GitHub(opts)

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
        warning.on('environment', err => {
            this.warningQueue.push(err)
        })
    }
}

export default Project