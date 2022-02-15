// noinspection JSUnresolvedFunction

import GitHub from 'github-api'
import {DEFAULT_GITHUB_ORG} from '../../config.mjs'

const defaultOpts = {
    orgName: DEFAULT_GITHUB_ORG
}

/**
 * @class Github
 */
class Github{

    /**
     * @param {Environment} environment
     * @param {object} opts
     * @param {string} opts.orgName
     */
    constructor(environment, opts = defaultOpts){
        this._gh = new GitHub({
            token: environment.ghToken
        })
        this._org = this._gh.getOrganization(opts.orgName)
    }


    async collectRepos(){
        this._org['getRepos']((err, repos) => {
                console.log(repos)
            })
        }
}

export default GitHub