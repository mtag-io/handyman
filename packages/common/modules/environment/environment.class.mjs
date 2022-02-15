import {resolve} from 'path'
import encryptor from 'simple-encryptor'
import {ENCRYPTION_KEY, GITHUB_TOKEN_KEY, HM_CACHE} from '../../config.mjs'
import {readJson, writeJson} from 'common/server'
import {notEmpty} from 'common/global'

/**
 * @class Environment
 */
class Environment{
    /**
     * @param {*} opts
     */
    constructor(opts = {}){
        this._env = notEmpty(opts) ? opts : this._readHm()
        // noinspection JSValidateTypes
        this._encryptor = encryptor(this._env[ENCRYPTION_KEY])
    }

    get ghToken(){
        return this._env[GITHUB_TOKEN_KEY]
    }

    /**
     * @return {object}
     * @private
     */
    _readHm(){
        try {
            return readJson(resolve(HM_CACHE))
        } catch(err){
            throw {
                message: `Couldn\'t retrieve the ENV_ENCRYPT_KEY from ${HM_CACHE}`,
                code: 5011,
                helper: `Please check you have a ENV_ENCRYPT_KEY in the ${HM_CACHE} file`
            }
        }
    }

    /**
     * @param {object} o
     */
    _writeHm(o){
        try {
            writeJson(resolve(HM_CACHE), o)
        } catch(err){
            throw {
                message: `Couldn\'t write the ${HM_CACHE} file.`,
                code: 5012,
                helper: `Please check you have the accesss rights to create the ${HM_CACHE} file.`
            }
        }
    }



    /**
     * @param {object} o
     * @return {string}
     */
    encryptEnv(o){
        return this._encryptor.encrypt(o)
    }

    /**
     * @param {string} st
     * @return {object}
     */
    decryptEnv(st){
        return this._encryptor.decrypt(st)
    }

    setWebPort(){
    }

    getGhKey(){

    }
}

export default Environment