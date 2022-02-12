import {encode} from 'querystring'
import {DELETE, GET, POST, PUT} from 'common/constants'
import {BASE_HEADERS, LOCAL_URL} from 'common/config'

/**
 * @param {string} selector
 * @param {any?} data
 * @param {object?} opts
 * @param {function?} opts.setData
 * @param {function?} opts.setLoader
 * @param {function?} opts.setError
 */
const http = (selector, data, opts = {}) => {
    const _tmp = {
        headers: BASE_HEADERS
    }
    let url

    const _parts = selector.split('.')
    if (_parts.length > 1) {
        switch (_parts[0]) {
            case 'create':
                _tmp.method = POST
                break
            case 'update':
                _tmp.method = PUT
                break
            case 'remove':
                _tmp.method = DELETE
                break
            default:
                _tmp.method = GET
        }
        url = LOCAL_URL + '/' + _parts[1]
    } else {
        url = LOCAL_URL + '/' + _parts[0]
        _tmp.method = GET
    }
    if (data)
        if (_tmp.method !== GET)
            _tmp.body = JSON.stringify(data)
        else url += encode(data)

    if (opts.setLoader) opts.setLoader(true)
    fetch(url, _tmp)
        .then(res => {
            if (res.ok) return res.json()
            else if (opts.setError) opts.setError({
                message: `Http status error: ${res.statusText}`,
                code: res.status
            })
            if (opts.setLoader) opts.setLoader(false)
        })
        .then(data => {
            if (opts.setData) opts.setData(data)
            if (opts.setLoader) opts.setLoader(false)
        })
        .catch(err => {
            if (opts.setError) opts.setError({
                message: err.message,
                status: err.code
            })
            if (opts.setLoader) opts.setLoader(false)
            console.dir(err)
        })
}

export default http