import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Logout = () =>
    <Box sx={{
        m: 2,
        p: 2,
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.200'
    }}>
        <Typography variant="h5">
            Application (server) has been stopped.
            To resume <b> &nbsp;Handyman&nbsp; </b>relaunch the <b>&nbsp;hm&nbsp;</b> app from the desired project
            folder.
        </Typography>
    </Box>


export default Logout
