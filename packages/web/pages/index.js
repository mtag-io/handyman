import * as React from 'react'
import {searchUp} from '__common__/utils/fs-utils'
import EditProject from '../src/components/views/project/EditProject'

const Home = props => <EditProject {...props}/>

export default Home

export const getStaticProps = async () => ({
    props: searchUp(
        process.cwd()
    )
})