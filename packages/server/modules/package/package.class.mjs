import {flushProps} from 'common/global'
import {readPackage, writePackage} from 'common/server'
import {pick} from 'common/global'
import {PACKAGE_JSON_PROPS} from 'common/constants'

/**
 * @class Package
 */

class Package {
    /**
     * @param {Package[]} pack
     */
    constructor(pack) {
        Object.entries(pack).forEach(([k, v]) => this[k] = v)
    }

    get root() {
        return this.path
    }

    flush() {
        return flushProps(this)
    }

    updatePkgJson() {
        writePackage(this.root, {
            ...readPackage(this.root),
            ...pick(this.flush(), PACKAGE_JSON_PROPS)
        })
    }
}

export default Package