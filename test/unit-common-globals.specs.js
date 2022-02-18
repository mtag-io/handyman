import {expect} from 'chai'
import {
    flushProps,
    filterInstanceByProp,
    includeSubStrings,
    urlAdd,
    stripSepLeft,
    stripSepRight,
    cleanSep
} from 'common/global'
import {capitalize} from 'common/global'

describe('string', () => {

    describe('includeSubStrings', () => {

        it('should pass for at least one match', () => {
            const testStr = 'dummy-test-text'
            expect(includeSubStrings(testStr, ['test'])).to.be.true
        })

        it('should for no match', () => {
            const testStr = 'dummy-test-text'
            expect(includeSubStrings(testStr, ['notfound'])).to.be.false
        })
    })

    describe('stripSepLeft', () => {

        it('should strip all left side SEP', () => {
            expect(stripSepLeft('///test')).to.equal('test')
        })

        it('should left side SEP', () => {
            expect(stripSepLeft('///test')).to.equal('test')
        })

        it('should leave untouched if no left SEP present', () => {
            expect(stripSepLeft('test')).to.equal('test')
        })
    })

    describe('stripSepRight', () => {

        it('should strip all right side SEP', () => {
            expect(stripSepRight('test///')).to.equal('test')
        })

        it('should leave untouched if no left SEP present', () => {
            expect(stripSepRight('test')).to.equal('test')
        })
    })

    describe('cleanSep', () => {

        it('should reduce repeating SEP sequence to only one SEP', () => {
            expect(cleanSep('//test///testing//')).to.equal('/test/testing/')
        })

        it('should leave untouched if no left SEP present', () => {
            expect(cleanSep('test')).to.equal('test')
        })
    })

    describe('addUrl', () => {

        it('should concatenate url', () => {
            const tp1 = '/whatever'
            const tp2 = 'something/'
            expect(urlAdd(tp1, tp2)).to.equal('/whatever/something')
        })

        it('should concatenate url', () => {
            const tp1 = '/whatever'
            const tp2 = '/something'
            const tp3 = '/last/'
            expect(urlAdd(tp1, tp2, tp3)).to.equal('/whatever/something/last')
        })

        it('should concatenate multiple sep urls ', () => {
            const tp1 = '/whatever/'
            const tp2 = '/something/'
            const tp3 = '/last/'
            expect(urlAdd(tp1, tp2, tp3)).to.equal('/whatever/something/last')
        })

        it('should concatenate clean parts url', () => {
            const tp1 = '/whatever'
            const tp2 = 'something'
            const tp3 = 'last'
            expect(urlAdd(tp1, tp2, tp3)).to.equal('/whatever/something/last')
        })
    })

    describe('capitalize', () => {

        it('should capitalize a string', () => {
            expect(capitalize('lower')).to.equal('Lower')
        })
    })
})

describe('oop', () => {

    class Dummy {
        constructor(v1, v2) {
            this.prop1 = v1 || 'whatever'
            this.prop2 = v2 || ['something', 'else']
            this._private = 'private'
        }

        method1() {
        }

        method2() {
        }
    }
    describe('flushProps', () => {

        const testInstance = new Dummy()

        it('should flush only props', () => {
            expect(flushProps(testInstance)).to.deep.eq({
                prop1: 'whatever',
                prop2: ['something', 'else']
            })
        })
    })

    describe('filterInstancesByProp', () => {

        Dummy.prototype.flush = function(){
            return flushProps(this)
        }

        const testObj = {
            key1: new Dummy(),
            key2: new Dummy('dummy', 25),
            key3: new Dummy(true, {whaever: 'something'})
        }

            it('should pass with filter found', () => {
                expect(filterInstanceByProp(testObj, {prop1: 'dummy'})).to.equal(testObj['key2'])
            })
    })
})