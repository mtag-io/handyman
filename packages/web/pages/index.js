import * as React from 'react'
import {Container} from '@mui/material'
import {searchUp} from '../src/utils/init'
import NewProject from '../src/components/views/NewProject'

const Home = (props) =>
    <Container>
        {props.init && <NewProject {...props}/>}
    </Container>

export default Home

export const getStaticProps = async () => ({
    props: searchUp(
        process.cwd()
    )
})