// noinspection JSCheckFunctionSignatures
import {expect} from 'chai'
import Github from '../packages/server/modules/github/github.class.mjs'
import {Environment} from '../packages/server/modules/index.mjs'

describe('GITHUB - class', () => {

    describe('getLibs', () => {

        // noinspection JSMismatchedCollectionQueryUpdate
        const warningsQueue = []

        const warnings = {

            emit: warn => {
                warningsQueue.push(warn)
            }
        }

        const environment = new Environment({warnings})

        const gh = new Github({environment, warnings})

        it('should get at least 1 lib', async () => {
            await gh.init()
            expect(gh.libRepos.length).to.be.greaterThan(0)
        })

    })

})