import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const PageHeader = ({title, subTitle}) =>
    <Box sx={{pb: 2}}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{subTitle}</Typography>
    </Box>

export default PageHeader