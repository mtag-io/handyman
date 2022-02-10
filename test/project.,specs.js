import {resolve} from 'path'
import {expect} from 'chai'
import {Project} from '__common__/modules/server'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION} from '__common__/config'

describe('project', () => {


    it('should create a new project', () => {

        const cwd = resolve('./test/__fixtures__/_dummy_fs_/new-project-root/packages/internal-pack1')
        const project = new Project(cwd)

        expect(project.data).to.deep.equal({
            name: 'new-project-root',
            path: resolve('./test/__fixtures__/_dummy_fs_/new-project-root/'),
            newProject: true,
            description: DEFAULT_DESCRIPTION,
            version: DEFAULT_VERSION
        })
    })

    it('should load the HM_CACHE', () => {

        const cwd = resolve('./test/__fixtures__/_dummy_fs_/project-root/packages/internal-pack1')
        const project = new Project(cwd)

        expect(project.data).to.deep.equal({
            name: "test-project",
            path: resolve('./test/__fixtures__/_dummy_fs_/project-root/'),
            description: 'Test description',
            version: '5.0.0',
            hasRootPkg: true
        })
    })
})