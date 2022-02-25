import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION} from 'common/config'

const GeneralPackageInfo = ({pkg, syncVersion}) =>
    <>
        <Box className="flex" sx={{mb: 1}}>
            <Typography variant="body1"><b>Name:</b></Typography>
            <Typography variant="body2" color="primary">&nbsp;{pkg.name}</Typography>
        </Box>
        <Box className="flex" sx={{mb: 1}}>
            <Typography variant="body1"><b>Path:</b></Typography>
            <Typography variant="body2" color="primary">&nbsp;{pkg.path}</Typography>
        </Box>
        <Box className="flex" sx={{mb: 1}}>
            <Typography variant="body1"><b>Description:</b></Typography>
            <Typography variant="body2" color="primary">&nbsp;{pkg.description}</Typography>
        </Box>
        <Box className="flex" sx={{mb: 1}}>
            <Typography variant="body1"><b>Version:</b></Typography>
            <Typography variant="body2" color="primary">&nbsp;{pkg.version}</Typography>
        </Box>
        {
            syncVersion &&
            <Typography variant="body2">Project modules version in sync.</Typography>
        }
    </>

export default GeneralPackageInfo

GeneralPackageInfo.defaultProps = {
    description: DEFAULT_DESCRIPTION,
    version: DEFAULT_VERSION
}