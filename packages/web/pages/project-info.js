import React, {useEffect} from 'react'
import ProjectInfo from '../src/views/project/ProjectInfo'
import {useRouter} from 'next/router'
import {useRecoilValue} from 'recoil'
import {projectAtom} from '../src/atoms/project-atom'
import {initGuard} from '../src/utils/guard'

const ProjectInfoPage = () => {
    const router = useRouter()
    const project = useRecoilValue(projectAtom)
    useEffect(...initGuard(router, project))

    return project && <ProjectInfo/>
}

export default ProjectInfoPage