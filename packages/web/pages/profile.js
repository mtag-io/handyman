import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React from 'react'

const Profile = () => <Box sx={{
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
        <b>TODO:</b>
        Profile page to help integrate with Clickup for time-tracking and branch management
    </Typography>
</Box>

export default Profile