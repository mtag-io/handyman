import {SEMVER_REGEXP} from '../../config.mjs'

const DOT = '.'

class Version {
    /**
     * @param {string} init
     */
    constructor(init) {

        if (!SEMVER_REGEXP.test(init))
            throw new Error(`Version shoud comply to semver standard. ${init} does not.`)
        this._digest(init)
        this.incMajor = this.incMajor.bind(this)
        this.incMinor = this.incMinor.bind(this)
        this.incPatch = this.incPatch.bind(this)
    }

    _digest(init) {
        const _parts = init.split(DOT)
        this._major = parseInt(_parts[0])
        this._minor = parseInt(_parts[1])
        this._patch = parseInt(_parts[2])
    }

    get val() {
        return [this._major, this._minor, this._patch].join(DOT)
    }

    incMajor() {
        this._major += 1
        return this.val
    }

    incMinor() {
        this._minor += 1
        return this.val
    }

    incPatch() {
        this._patch += 1
        return this.val
    }
}

export default Version