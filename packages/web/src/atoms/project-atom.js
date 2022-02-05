import {atom} from 'recoil'

export const projectAtom = atom({
    key: 'projectAtom',
    default: {
        name: '',
        path: '',
        version: '',
        description: ''
    }
})