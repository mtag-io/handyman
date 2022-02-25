import React, {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import {projectAtom} from '../atoms/project.atom'
import {useRouter} from 'next/router'
import http from '../utils/http'
import {empty} from 'common/global'
import Project from '../views/project/Project'
import LoaderScreen from '../components/Util/LoaderScreen'
import {errorRoute} from '../utils/helpers'

const Home = (project) => {
    const [ready, setReady] = useState(false)
    const setProject = useRecoilState(projectAtom)[1]
    const _router = useRouter()

    useEffect(() => {
        if (project.error) {
            _router.push(errorRoute(project.code)).then()
        } else {
            setProject(project)
            setReady(true)
        }
    }, [])

    return ready ? <Project/> : <LoaderScreen/>
}

export default Home

export const getStaticProps = async () => {
    const _payload = await http.server('project.get')
    if (_payload['error']) {
        let code
        if (_payload['code'] === 'ECONNREFUSED') code = 511
        else if (empty(_payload)) code = 510
        else code = 500
        return {
            props: {
                error: true,
                code
            }
        }
    }

    return {props: _payload}
}

