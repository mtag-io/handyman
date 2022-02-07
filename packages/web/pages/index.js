import * as React from 'react'
import EditProject from '../src/components/views/project/EditProject'
import {Project} from '__common__/modules/server'

const Home = props => <EditProject {...props}/>

export default Home

export const getStaticProps = () => {
    const project = new Project(process.cwd())
    return {props: project.data}
}

