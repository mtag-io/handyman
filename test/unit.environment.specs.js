import {expect} from 'chai'
import {Environment} from 'common/modules/server'
import {ENCRYPTION_KEY} from 'common/config'

describe('Environment class', () => {

    const env = new Environment({[ENCRYPTION_KEY]: 'dummy_encription_key'})

    describe('encryption/decryption', () => {

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