import {PUT} from 'common/constants'

export const HM_CONFIG = '.hm.json'
export const HM_CACHE = '~/.hm'
export const PACKAGES = 'packages'

// HTTP
export const BASE_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
export const SERVER_PORT = 3001
export const CLIENT_PORT = 3000
export const LOCAL_URL = `http://localhost:${SERVER_PORT}`

export const SEMVER_REGEXP = /^\d+\.\d+\.\d+$/

// Github
export const GITHUB_LIBRARY_ID = 'internal-lib'

export const MODULES = [
    {
        name: 'Project',
        path: '/'
    },
    {
        name: 'Packages',
        path: '/package/:id',
        isComp: true
    },
    {
        name: 'Environment',
        path: '/environment'
    },
    {
        name: 'Resources',
        path: '/resources'
    },
    {
        name: 'Github',
        path: '/github'
    }
]
// Defaults
export const DEFAULT_DESCRIPTION = 'No description'
export const DEFAULT_VERSION = '0.0.1'
export const DEFAULT_GITHUB_ORG = 'mtag-io'
export const DEFAULT_CLIENT_MATCHES = [
    'web',
    'client',
    'front'
]
export const DEFAULT_SERVER_MATCHES = [
    'server',
    'back'
]

export const DEFAULT_HM_CONFIG = {
    'syncVersion': false
}

//Keys
export const ENCRYPTION_KEY = 'crypto-key'
export const GITHUB_TOKEN_KEY = 'github-token'

// Endpoints
export const SHUTDOWN = 'shutdown'
export const WARNING = 'warnings'
export const PROJECT = 'project'

export const endpoints = {
    [SHUTDOWN]: {},
    [WARNING]:{
        resolvers: {
            get:{},
            delete:{
                param: 'id'
            }
        }
    },
    [PROJECT]:{
        resolvers: {
            get: {},
            update: {
                method: PUT
            }
        }
    }
}


