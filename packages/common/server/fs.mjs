// noinspection ES6PreferShortImport

import {basename, dirname, extname, join, sep, resolve} from 'path'
import {existsSync, readFileSync, statSync, symlinkSync, unlinkSync, writeFileSync} from 'fs'
import {fileURLToPath} from 'url'
import {
    DEFAULT_CLIENT_MATCHES,
    DEFAULT_DESCRIPTION,
    DEFAULT_SERVER_MATCHES,
    DEFAULT_VERSION,
    HM_CONFIG,
    PACKAGES
} from '../config/index.mjs'
import {JSON_EXT, PKG} from '../constants/index.mjs'
import glob from 'fast-glob'
import {includeSubStrings} from 'common/global'

export const __dirname = url => {
    return dirname(fileURLToPath(url))
}

/**
 * @desc removes exptra sep to end of path
 * @param {string} pth
 * @return {string}
 */
export const cleanPath = pth => pth[pth.length - 1] === sep ? pth.slice(0, pth.length - 1) : pth

/**
 * @param {string?} pth
 * @return {{root: string, isNew: boolean?} | null}
 */
export const searchUp = pth => {
    let tmp = pth || process.cwd()
    while (tmp !== '/') {
        const hmPath = join(tmp, HM_CONFIG)
        const packPath = join(tmp, PACKAGES)
        if (existsSync(hmPath))
            return {
                root: cleanPath(tmp),
                conf: readJson(hmPath)
            }
        if (existsSync(packPath) && statSync(packPath).isDirectory())
            return {
                root: cleanPath(tmp)
            }
        tmp = join(tmp, '../')
    }
    return null
}

/**
 * @name readJson
 * @description safely reads a json file
 * @param {String} pth
 * @return {Object}
 */
export const readJson = (pth) => {
    if (!existsSync(pth))
        throw {
            message: `Json file not found in ${pth}.`,
            code: 5008,
            helper: 'Please check again the provided path'
        }
    try {
        return JSON.parse(readFileSync(pth, 'utf8'))
    } catch (err) {
        throw {
            message: `Json file malformed at ${pth}.`,
            code: 5009,
            helper: 'Please check the format and syntax of the json file'
        }
    }
}

/**
 * @name writeJson
 * @param {String} pth
 * @param {Object} data
 * @param {object} opts
 * @param {boolean?} opts.noExt
 */
export const writeJson = (pth, data,  opts={}) => {
    if (!opts.noExt && !pth.endsWith(JSON_EXT)) pth += JSON_EXT
    try {
        writeFileSync(pth, JSON.stringify(data, null, 2))
    } catch (err) {
        throw {
            message: `Couldn't write json file in ${pth}.`,
            code: 5008,
            helper: 'Please check again the provided path and the process permissions'
        }
    }
}

/**
 * @param {string} src
 * @param {string} dest
 * @returns <void>
 */
export const createLink = (src, dest) => {
    const type = extname(basename(src)) ? 'file' : 'dir'
    try {
        if (existsSync(dest)) unlinkSync(dest)
        symlinkSync(src, dest, type)
    } catch (err) {
        throw {
            message: `Couln't create link for ${src} in ${dest}.`,
            code: 5010,
            helper: 'Please check again the provided paths and permissions'
        }
    }
}

/**
 * @name readPackage
 * @description gets a single package.json
 * @param {String} root
 * @return {object}
 */
export const readPackage = root => {
    if (basename(root) !== PKG) root = join(root, PKG)
    return readJson(root)
}

/**
 * @name writePackage
 * @description writes a package.json file
 * @param {Object} pkg
 * @param {String} root
 */
export const writePackage = (root, pkg) => {
    if (basename(root) !== PKG) root = join(root, PKG)
    writeJson(root, pkg)
}

/**
 * @name updatePackages
 * @description updates a package.json file
 * @param {Object} pkgUpdate
 * @param {String} root
 */
export const updatePackage = (root, pkgUpdate) => {
    if (basename(root) !== PKG) root = join(root, PKG)
    let pkg = readPackage(root)
    pkg = {...pkg, ...pkgUpdate}
    writePackage(root, pkg)
}

/**
 * @description create a record of all subsequent package.json
 * defined packages in a project
 * @param {string} root
 * @return {object}
 */
export const extractPackages = root => {
    const pkgPaths = glob.sync(
        ['**/package.json', '!**/test', '!**/node_modules'],
        {
            cwd: root,
            absolute: true
        })
    return pkgPaths.map(pkgPath => {

        const pkg = readJson(pkgPath)

        const _tmp = {
            path: dirname(pkgPath),
            name: pkg.name,
            version: pkg.version || DEFAULT_VERSION,
            description: pkg.description || DEFAULT_DESCRIPTION
        }
        if (dirname(pkgPath) === root)
            _tmp.isRoot = true
        if (includeSubStrings(pkg.name, DEFAULT_CLIENT_MATCHES))
            _tmp.isClient = true
        if (includeSubStrings(pkg.name, DEFAULT_SERVER_MATCHES))
            _tmp.isServer = true
        return _tmp
    })
}

export const checkRootPackage = root => {
    try {
        return !!readPackage(root)
    } catch (err) {
        return false
    }
}

export const initRootPackage = root => {
    writePackage(root, {
        name: basename(root),
        description: DEFAULT_DESCRIPTION,
        version: DEFAULT_VERSION
    })
}

export const readHMConf = root => {
    if (basename(root) !== HM_CONFIG) root = join(root, HM_CONFIG)
    return readJson(root)
}

export const writeHMConf = (root, conf) => {
    if (basename(root) !== HM_CONFIG) root = join(root, HM_CONFIG)
    return writeJson(root, conf)
}

export const resolveHome = pt => pt.indexOf('~') !== -1
    ? resolve(pt.replace('~', cleanPath(process.env.HOME.concat(sep))))
    : resolve(pt)