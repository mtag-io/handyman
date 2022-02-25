import {resolve} from 'path'
import encryptor from 'simple-encryptor'
import {ENCRYPTION_KEY, GITHUB_TOKEN_KEY, HM_CACHE} from 'common/config'
import {readJson, resolveHome, writeJson} from 'common/server'
import {ENVIRONMENT} from 'common/constants'

/**
 * @class Environment
 */
class Environment {
    /**
     * @param {*} opts
     */
    constructor(opts) {

        this.warning = opts.warnings
        const hm = this._readHm(opts.hmCache || HM_CACHE)
        if (opts[ENCRYPTION_KEY] || (hm && hm[ENCRYPTION_KEY]))
            this[ENCRYPTION_KEY] = opts[ENCRYPTION_KEY] || (hm && hm[ENCRYPTION_KEY])
        if (opts[GITHUB_TOKEN_KEY] || (hm && hm[GITHUB_TOKEN_KEY]))
            this[GITHUB_TOKEN_KEY] = opts[GITHUB_TOKEN_KEY] || (hm && hm[GITHUB_TOKEN_KEY])

        if (this[ENCRYPTION_KEY])
            // noinspection JSValidateTypes
            this._encryptor = encryptor(this[ENCRYPTION_KEY])
    }

    get ghToken() {
        return this[GITHUB_TOKEN_KEY]
    }

    /**
     * @return {object}
     * @private
     */
    _readHm(hmCache) {
        try {
            return readJson(resolveHome(hmCache))
        } catch (err) {
            this.warning.emit(ENVIRONMENT, {
                errType: 'FS_ERROR',
                code: 'HM_CACHE_READ',
                message: `Unexisting or damaged ${HM_CACHE} file.`
            })
        }
    }

    /**
     * @param {object} o
     */
    _writeHm(o) {
        try {
            writeJson(resolve(HM_CACHE), o)
        } catch (err) {
            this.warning.emit('environment', {
                errType: 'FS_ERROR',
                code: 'HM_CACHE_WRITE',
                message: `Could't write ${HM_CACHE} file.`
            })
        }
    }

    /**
     * @param {object} o
     * @return {string}
     */
    encryptEnv(o) {
        return this._encryptor && this._encryptor.encrypt(o)
    }

    /**
     * @param {string} st
     * @return {object}
     */
    decryptEnv(st) {
        return this._encryptor && this._encryptor.decrypt(st)
    }

    setWebPort() {
    }

    getGhKey() {

    }
}

export default Environment