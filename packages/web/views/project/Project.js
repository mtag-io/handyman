import React, {useState} from 'react'
import Edit from './Edit'
import Info from './Info'

const Project = () => {
    const [editable, setEditable] = useState(false)

    const edit = () => {
        setEditable(true)
    }

    const info = () => {
        setEditable(false)
    }
    return editable ? <Edit info={info}/> : <Info edit={edit}/>
}

export default Project