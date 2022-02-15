import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useRecoilValue} from 'recoil'
import {projectAtom} from '../src/atoms/project-atom'
import EditProject from '../src/views/project/EditProject'
import {initGuard} from '../src/utils/guard'

const NewProjectPage = () => {
    const router = useRouter()
    const project = useRecoilValue(projectAtom)
    useEffect(...initGuard(router, project))
    return project && <EditProject newProject/>
}

export default NewProjectPage