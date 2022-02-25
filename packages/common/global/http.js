import {DELETE, GET, PUT, POST} from 'common/constants'

export const toHttpVerb = st => {
    const trans = {
        update: PUT,
        read: GET,
        create: POST,
        remove: DELETE,
        write: POST,
        get: GET,
        post: POST,
        put: PUT,
        delete: DELETE
    }
    const verb = st ? trans[st.toLowerCase()] || GET: GET
    return verb.toUpperCase()
}