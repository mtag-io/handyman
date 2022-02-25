import {useEffect} from 'react'
import {ERROR_ROUTE, HOME_ROUTE, SEP} from 'common/constants'
import {useRecoilValue} from 'recoil'
import {useRouter} from 'next/router'
import {projectAtom} from '../atoms/project.atom'
import {empty} from 'common/global'

const redirector  = (uEff, deps = []) => {
    const project = useRecoilValue(projectAtom)
    const router = useRouter()
    useEffect(() => {
        if (empty(project))
            return router.replace(HOME_ROUTE).then()
        if (project.error)
            return router.replace(ERROR_ROUTE.concat((SEP + project.code) || '/500')).then()
        uEff && uEff()
    }, deps)
}

export default redirector