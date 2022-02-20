// noinspection JSUnresolvedFunction
import GitHub from 'github-api'
import {DEFAULT_GITHUB_ORG, GITHUB_LIBRARY_ID} from 'common/config'

/**
 * @class Github
 */
class Github {

    /**
     * @param {string?} opts.orgName
     * @param {Warnings} opts.warnings
     * @param {{environment: Environment}} opts
     */
    constructor(opts) {
        this.env = opts.environment
        this.warnings = opts.warnings
        this.orgName = opts.orgName || DEFAULT_GITHUB_ORG
        this._gh = new GitHub({
            token: this.env.ghToken
        })
        this._org = this._gh['getOrganization'](this.orgName)
    }

    async init() {
        await this._libCollect()
    }

    async _libCollect() {
        return new Promise(resolve => {
            this._org['getRepos']((err, repos) => {
                if (err) {
                    this.warnings.emit('github', {
                        errType: 'GH_ERROR',
                        code: 'GH_API_READ',
                        message: `Server has errored while getting data from GitHub api.`
                    })
                    this._libRepo = []
                }
                this._libRepo = repos
                    .filter(rep =>rep['topics'].includes(GITHUB_LIBRARY_ID))
                resolve()
            })
        })
    }

    get libRepos(){
        return this._libRepo
    }

    /**
     * @param {object}pkg
     * @param {object<string, string>} pkg.dependencies
     * @param {object<string, string>} pkg.devDependencies
     */
    spotOrgLibs(pkg) {
        const deps = Object.entries({...pkg.dependencies, ...pkg.devDependencies})
        return deps.filter(([depName, versionOrUrl]) =>
            this._libRepo.includes(depName) && versionOrUrl.includes('git+https'))
    }
}

export default Github