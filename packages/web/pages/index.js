import React, {useEffect} from 'react'
import {Project} from 'common/modules/server'
import propTypes from 'prop-types'
import {useRecoilState} from 'recoil'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import {projectAtom} from '../src/atoms/project-atom'
import {useRouter} from 'next/router'

const Home = (props) => {
    const setProject = useRecoilState(projectAtom)[1]
    const {newProject, ...project} = props
    const router = useRouter()

    useEffect(() => {
        setProject(project)
        if (newProject)
            router.push('/new-project').then()
        else
            router.push('/project-info').then()
    }, [])

    return <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open>
        <CircularProgress color="inherit"/>
    </Backdrop>
}

Home.propTypes = {
    project: propTypes.shape({
        newProject: propTypes.bool,
        name: propTypes.string.isRequired,
        path: propTypes.string.isRequired,
        description: propTypes.string.isRequired,
        version: propTypes.string.isRequired,
        syncRootPkg: propTypes.bool,
        syncSubPkg: propTypes.bool
    })
}

export default Home

export const getStaticProps = () => {
    const project = new Project({root: process.cwd()})
    return {props: project.flush()}
}

