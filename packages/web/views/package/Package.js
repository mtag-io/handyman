import React, {useState} from 'react'
import Edit from './Edit'
import Info from './Info'

const Package = ({pkgId}) => {
    const [editable, setEditable] = useState(false)

    const edit = () => {
        setEditable(true)
    }

    const info = () => {
        setEditable(false)
    }
    return editable ? <Edit info={info} pkgId={pkgId}/> : <Info edit={edit} pkgId={pkgId}/>
}

export default Package