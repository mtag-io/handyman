import {expect} from 'chai'
import {resolve} from 'path'
import {existsSync, unlinkSync} from 'fs'
import {Environment} from '../packages/server/modules/index.mjs'
import {ENVIRONMENT} from 'common/constants'
import {ENCRYPTION_KEY, GITHUB_TOKEN_KEY} from 'common/config'
import {writeJson} from 'common/server'

describe('ENVIRONMENT - CLASS', () => {

    describe('constructor', () => {

        const warningsQueue = []
        const hmCache = resolve('./test/__fixtures__/_dummy_fs_/.hm')

        const warnings = {
            emit: warn => {
                warningsQueue.push(warn)
            }
        }

        after(() => {
            if(existsSync(hmCache))
                unlinkSync(hmCache)
        })

        it('should construct an insatance', () => {

            new Environment({
                warnings,
                hmCache
            })
            if (existsSync(hmCache)) {
                unlinkSync(hmCache)
            }
            expect(warningsQueue.length).to.equal(1)
            expect(warningsQueue[0]).to.equal(ENVIRONMENT)
        })

        it('should read the hm file', () => {

            const encKey = 'dummy-enc-key-minimum-16-characters-long'
            const ghToken = 'dummy-github-key'

            writeJson(hmCache, {
                [ENCRYPTION_KEY]: encKey,
                [GITHUB_TOKEN_KEY]: ghToken
            }, {noExt: true})

            const env = new Environment({
                warnings,
                hmCache
            })

            if (existsSync(hmCache)) {
                unlinkSync(hmCache)
            }
            expect(env[ENCRYPTION_KEY]).to.equal(encKey)
            expect(env[GITHUB_TOKEN_KEY]).to.equal(ghToken)
        })

    })

    describe('encryption/decryption', () => {

        const warnings = {
            emit:() => {}
        }

        const env = new Environment({
            warnings,
            [ENCRYPTION_KEY]:'dummy-enc-key-minimum-16-characters-long'
        })

        it('should encrypt/decrypt an arbitrary object', () => {
            const testObj = {
                key1: 'dummy1',
                key2: {
                    key3: 'dummy3'
                }
            }
            const enc = env.encryptEnv(testObj)
            const dec = env.decryptEnv(enc)

            expect(typeof enc === 'string' && enc.length).to.be.ok
            expect(dec).to.deep.equal(testObj)
        })


    })

})