// noinspection ES6PreferShortImport

import {expect} from 'chai'
import {DELETE, SEP} from 'common/constants'
import {Http} from 'common/web'
import {BASE_HEADERS} from 'common/config'

describe('CLIENT - UNIT TESTS', () => {

    describe('HTTP - class', () => {

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

        const http = new Http(testEndpoints)

        describe('private method _solve', () => {

            it('should create the right endpoint payload for complex', () => {
                expect(http._solve('complex.noMatch')).to.deep.equal({
                    path: '/testPath/posts',
                    method: 'DELETE'
                })
            })

            it('should create the right endpoint payload for minimal ep', () => {
                expect(http._solve('minimal')).to.deep.equal({
                    path: '/minimal',
                    method: 'GET'
                })
            })

            it('should create the right endpoint payload get resolver', () => {
                expect(http._solve('complex.get')).to.deep.equal({
                    path: '/testPath',
                    method: 'GET'
                })
            })

            it('should create the right endpoint payload get resolver', () => {
                expect(http._solve('simple.put')).to.deep.equal({
                    path: '/simple',
                    method: 'PUT'
                })
            })
        })

        describe('client', () => {

            let loaderCalls

            const baseUrl = 'http://localhost:4455'

            const setLoader = state => {
                if (loaderCalls === 0) {
                    expect(state).to.be.true
                    loaderCalls += 1
                    return
                }

                if (loaderCalls === 1) {
                    expect(state).to.be.false
                }
            }

            it('should reject with setError', async () => {

                loaderCalls = 0

                const setError = error => {
                    expect(error.error).to.be.true
                }

                const fakeFetch = (url, payload) => {
                    expect(url).to.equal(baseUrl.concat(SEP, 'testPath/posts'))
                    expect(payload).to.deep.equal({
                        method: DELETE,
                        headers: BASE_HEADERS
                    })
                    return Promise.reject({
                        error: true
                    })
                }

                await http.client('complex.noMatch', {
                    setLoader,
                    setError,
                    fetch: fakeFetch,
                    baseUrl
                })
            })
        })
    })

})