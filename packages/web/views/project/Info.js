import React from 'react'
import {useRecoilValue} from 'recoil'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {projectAtom} from '../../atoms/project.atom'
import GeneralPackageInfo from '../../components/GeneralPackageInfo'
import PageHeader from '../layout/PageHeader'
import Modules from './Modules'
import {getRootPkg} from '../../utils/helpers'

const Info = ({edit}) => {
    const project = useRecoilValue(projectAtom)
    return <Box>
        <PageHeader title="Package info:" subTitle="General information about the current project"/>
        <GeneralPackageInfo pkg={getRootPkg(project)} syncVersion={project.syncVersion}/>
        <Modules packages={project.packages}/>
        <Button
            sx={{mt: 2}}
            variant="outlined"
            color="primary"
            onClick={edit}>Edit
        </Button>
    </Box>
}

export default Info