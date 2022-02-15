import React, {useEffect} from 'react'
import {useRecoilValue} from 'recoil'
import {projectAtom} from '../../src/atoms/project-atom'
import {useRouter} from 'next/router'
import PackageInfo from '../../src/views/package/PackageInfo'
import {initGuard} from '../../src/utils/guard'

const PackageInfoPage = () => {
    const router = useRouter()
    const {id} = router.query
    const project = useRecoilValue(projectAtom)
    useEffect(...initGuard(router, project))

    return project && <PackageInfo module={project.packages[id]}/>
}

export default PackageInfoPage