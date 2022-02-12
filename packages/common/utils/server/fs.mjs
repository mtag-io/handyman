import {basename, extname, join} from 'path'
import {existsSync, readFileSync, statSync, symlinkSync, unlinkSync, writeFileSync} from 'fs'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION, HM_CACHE, PACKAGES} from '../../config.mjs'
import {JSON_EXT, PKG} from '../../constants.mjs'
import glob from 'fast-glob'

/**
 * @param {string} pth
 * @return {string}
 */
export const searchUp = pth => {
    let tmp = pth
    while (tmp !== '/') {
        const hmPath = join(tmp, HM_CACHE)
        const packPath = join(tmp, PACKAGES)
        if (existsSync(hmPath))
            return hmPath
        if (existsSync(packPath) && statSync(packPath).isDirectory())
            return packPath
        tmp = join(tmp, '../')
    }
    return ''
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
 */
export const writeJson = (pth, data) => {
    if (!pth.endsWith(JSON_EXT)) pth += JSON_EXT
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
 * @description create a record of all subsequent packages in a project
 * @param {string} root
 * @return {object}
 */
export const extractPackages = root => {
    const pkgPaths = glob.sync(
        [
            '**/package.json',
            '!**/test/**/*',
            '!**/node_modules/**/*',
            '!./package.json'
        ],
        {
            cwd: root,
            absolute: true
        })
    return pkgPaths.map(pkgPath => {
        const pkg = readJson(pkgPath)
        return {
            path: pkgPath,
            name: pkg.name,
            version: pkg.version || DEFAULT_VERSION,
            description: pkg.description || DEFAULT_DESCRIPTION
        }
    })
}