import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'
import React from 'react'

const LoaderScreen = () => <Backdrop
    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open>
    <CircularProgress color="inherit"/>
</Backdrop>

export default LoaderScreen