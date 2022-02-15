import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import {DEFAULT_DESCRIPTION, DEFAULT_VERSION} from 'common/config'

const MainInfo = ({project}) =>
    <>
        <Box className="flex" sx={{mb: 1}}>
            <Typography variant="body1"><b>Name:</b></Typography>
            <Typography variant="body2" color="primary">&nbsp;{project.name}</Typography>
        </Box>
        <Box className="flex" sx={{mb: 1}}>
            <Typography variant="body1"><b>Path:</b></Typography>
            <Typography variant="body2" color="primary">&nbsp;{project.path}</Typography>
        </Box>
        <Box className="flex" sx={{mb: 1}}>
            <Typography variant="body1"><b>Description:</b></Typography>
            <Typography variant="body2" color="primary">&nbsp;{project.description}</Typography>
        </Box>
        <Box className="flex" sx={{mb: 1}}>
            <Typography variant="body1"><b>Version:</b></Typography>
            <Typography variant="body2" color="primary">&nbsp;{project.version}</Typography>
        </Box>
    </>

export default MainInfo

MainInfo.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        path: PropTypes.string.isRequired,
        version: PropTypes.string
    })
}

MainInfo.defaultProps = {
    description: DEFAULT_DESCRIPTION,
    version: DEFAULT_VERSION
}