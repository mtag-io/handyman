// import {join, dirname} from 'path'
// import {existsSync, readFileSync, unlinkSync} from 'fs'
// import {expect} from 'chai'
// import fetch from 'node-fetch'
// import {DUMMY_FS_ROOT, FIXTURES} from './__fixtures__/test-const.mjs'
// import {BASE_HEADERS, HM_CONFIG, LOCAL_URL} from 'common/config'
// import {POST} from 'common/constants'
//
// const dir = dirname(import.meta.url.replace('file://', ''))
//
// describe('project endpoint', () => {
//
//     const testPath = join(dir, FIXTURES, DUMMY_FS_ROOT, 'project-root')
//     const testHmPath = join(testPath, HM_CONFIG)
//
//     before(() => {
//         if (existsSync(testHmPath))
//             unlinkSync(testHmPath)
//     })
//
//     it('should create a new HM_CONFIG file in dummy_fs/project-root', async () => {
//
//         const data = {
//             name: 'test-project',
//             path: testPath,
//             description: 'Test description',
//             version: '5.0.0'
//         }
//
//         const res = await fetch(
//             `${LOCAL_URL}/project`,
//             {
//                 method: POST,
//                 headers: BASE_HEADERS,
//                 body: JSON.stringify(data)
//             })
//
//         expect(res.status).to.eq(200)
//         expect(existsSync(testHmPath)).to.be.true
//         const _data = JSON.parse(readFileSync(testHmPath, 'utf-8'))
//         expect(_data).to.deep.equal(data)
//     })
// })