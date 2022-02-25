import React from 'react'
import {useRecoilValue} from 'recoil'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {projectAtom} from '../../atoms/project.atom'
import GeneralPackageInfo from '../../components/GeneralPackageInfo'
import PageHeader from '../layout/PageHeader'

const Info = ({edit, pkgId}) => {
    const project = useRecoilValue(projectAtom)
    const pkg = project && project.packages && project.packages.length && project.packages[pkgId]

    return pkg && <Box>
        <PageHeader title="Package info:" subTitle="General information about the current project"/>
        <GeneralPackageInfo pkg={pkg} syncVersion={project.syncVersion}/>
        <Button
            sx={{mt: 2}}
            variant="outlined"
            color="primary"
            onClick={edit}>Edit
        </Button>
    </Box>
}

export default Info