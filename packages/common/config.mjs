export const SERVER_PORT = 3001
export const CLIENT_PORT = 3000
export const HM_CACHE = '.hm.json'
export const BASE_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
export const PACKAGES = 'packages'
export const LOCAL_URL = `http://localhost:${SERVER_PORT}`
export const DEFAULT_DESCRIPTION = 'No description'
export const DEFAULT_VERSION = '0.0.1'
export const SEMVER_REGEXP = /^\d+\.\d+\.\d+$/
export const ERROR_CONTENT = {
    'Failed to fetch': {
        message: 'Failed to fetch error. HTTP request failed',
        helper: 'Check if the server is running'
    }
}