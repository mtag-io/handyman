import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import MainInfo from '../../components/MainInfo'

const PackageInfo = ({module}) =>
    <>
        <Box sx={{mb: 2}}>
            <Typography variant="h5">Module package info:</Typography>
            <Typography variant="body2">Whatever for now </Typography>
        </Box>
        <MainInfo project={module}/>
    </>


export default PackageInfo