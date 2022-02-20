// noinspection ES6PreferShortImport

import {expect} from 'chai'
import {DELETE} from 'common/constants'
import {solveEndpoint} from '../packages/common/cilent/endpoints.mjs'

describe('CLIENT - UNIT TESTS', () => {

    describe('solveEndpoints', () => {
        const testEndpoints = {
            complex: {
                route: '/testPath',
                resolvers: {
                    get: {
                        param: 'id'
                    },
                    noMatch: {
                        path: 'posts',
                        method: DELETE
                    }
                }
            },
            simple: {
                resolvers: {
                    put: {}
                }
            },
            minimal: {}
        }

        it('should create the right endpoint payload for complex', () => {
            expect(solveEndpoint('complex.noMatch', testEndpoints)).to.deep.equal({
                path: '/testPath/posts',
                method: 'DELETE'
            })
        })

        it('should create the right endpoint payload for minimal ep', () => {
            expect(solveEndpoint('minimal', testEndpoints)).to.deep.equal({
                path: '/minimal',
                method: 'GET'
            })
        })

        it('should create the right endpoint payload get resolver', () => {
            expect(solveEndpoint('complex.get', testEndpoints)).to.deep.equal({
                path: '/testPath',
                method: 'GET'
            })
        })

        it('should create the right endpoint payload get resolver', () => {
            expect(solveEndpoint('simple.put', testEndpoints)).to.deep.equal({
                path: '/simple',
                method: 'PUT'
            })
        })
    })
})