import {expect} from 'chai'
import {flushProps, filterInstanceByProp, includeSubStrings} from 'common/global'

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