import React, {useEffect} from 'react'
import EditProject from '../src/views/project/EditProject'
import {useRouter} from 'next/router'
import {useRecoilValue} from 'recoil'
import {projectAtom} from '../src/atoms/project-atom'
import {initGuard} from '../src/utils/guard'

const EditProjectPage = () => {
    const router = useRouter()
    const project = useRecoilValue(projectAtom)
    useEffect(...initGuard(router, project))
    return project && <EditProject/>
}

export default EditProjectPage