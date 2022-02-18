import {join, resolve, sep} from 'path'
import {expect} from 'chai'
import {
    __dirname,
    checkRootPackage,
    cleanPath,
    extractPackages,
    initRootPackage,
    readPackage,
    searchUp,
    spreadEndpoint
} from 'common/server'
import {unlinkSync} from 'fs'
import {PKG, DELETE} from 'common/constants'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION} from 'common/config'

describe('SERVER - UNIT TESTS', () => {

    describe('cleanPath', () => {

        it('should cleanup the path ernding with a slash', () => {
            const pathParts = ['..', 'dummy', 'path'].join(sep)
            const testPath = pathParts.concat(sep)
            // noinspection JSCheckFunctionSignatures
            expect(cleanPath(testPath)).to.equal(pathParts)
        })

        it('should leave the path untouched', () => {
            const pathParts = ['..', 'dummy', 'path'].join(sep)
            // noinspection JSCheckFunctionSignatures
            expect(cleanPath(pathParts)).to.equal(pathParts)
        })
    })

    describe('searchUp', () => {

        it('should pass with right path (new project)', () => {
            const testPath = resolve(__dirname(import.meta.url), './__fixtures__/_dummy_fs_/new-project-root/packages/internal-pack1')
            const {root, isNew} = searchUp(testPath)
            expect(root).to.equal(
                resolve(__dirname(import.meta.url), './__fixtures__/_dummy_fs_/new-project-root'))
            expect(isNew).to.be.true
        })

        it('should pass with right path (hm.json)', () => {
            const testPath = resolve(__dirname(import.meta.url), './__fixtures__/_dummy_fs_/project-root/packages/internal-pack1')
            const {root, isNew} = searchUp(testPath)
            expect(root).to.equal(
                resolve(__dirname(import.meta.url), './__fixtures__/_dummy_fs_/project-root'))
            expect(isNew).to.be.not.ok
        })
    })

    describe('extractPackages', () => {

        it('should get the right packages', () => {
            const testPath = resolve(__dirname(import.meta.url), './__fixtures__/_dummy_fs_/new-project-root')
            const pks = extractPackages(testPath)
            const server = pks.filter(p => p.isServer)
            expect(server.length).to.equal(1)
            expect(server[0].version).to.equal('1.1.2')
            const client = pks.filter(p => p.isClient)
            expect(client.length).to.equal(1)
            expect(client[0].version).to.equal('1.1.1')
        })
    })

    describe('checkRootPackage', () => {

        const noRoot = resolve(__dirname(import.meta.url), './__fixtures__/_dummy_fs_/no-root')
        const hasRoot = resolve(__dirname(import.meta.url), './__fixtures__/_dummy_fs_/project-root')

        it('should return false', () => {
            const hasPkg = checkRootPackage(noRoot)
            expect(hasPkg).to.be.false
        })

        it('should return true', () => {
            const hasPkg = checkRootPackage(hasRoot)
            expect(hasPkg).to.be.true
        })

        describe('initRootPackage', () => {

            const noRoot = resolve(__dirname(import.meta.url), './__fixtures__/_dummy_fs_/no-root')

            before(() => {
                try {
                    readPackage(noRoot)
                    unlinkSync(join(noRoot, PKG))
                } catch (_) {
                }
            })

            after(() => {
                try {
                    readPackage(noRoot)
                    unlinkSync(join(noRoot, PKG))
                } catch (_) {
                }
            })

            it('should ', () => {
                const hasPkg = checkRootPackage(noRoot)
                expect(hasPkg).to.be.false
            })

            it('should create a new root package', () => {
                initRootPackage(noRoot)
                const pkg = readPackage(noRoot)
                expect(pkg).to.deep.equal({
                    name: 'no-root',
                    description: DEFAULT_DESCRIPTION,
                    version: DEFAULT_VERSION
                })
            })
        })
    })

    describe('speradEndpoint', () => {

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

        it('should resolve a complex endpoint', () => {

            expect(spreadEndpoint(testEndpoints)).to.deep.equal([
                {
                    route: "/testPath",
                    method: "GET",
                    path: "/:id",
                    resolver: "complexGet"
                },
                {
                    route: "/testPath",
                    method: "DELETE",
                    path: "/posts",
                    resolver: "complexNoMatch"
                },
                {
                    route: "/simple",
                    path:'/',
                    method: "GET",
                    resolver: "simplePut"
                },
                {
                    route: "/minimal",
                    method: "GET",
                    path: "/",
                    resolver: "minimal"
                }
            ])
        })
    })
})