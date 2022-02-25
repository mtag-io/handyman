import Box from '@mui/material/Box'
import ErrorIcon from '@mui/icons-material/Error'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React from 'react'
import {useRouter} from 'next/router'

const Error = ({message, code, helper, routeTo}) => {
    const router = useRouter()

    const goTo = () => {
        router.push(routeTo).then()
    }

    return <Box sx={{
        m: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center'
    }}>
        <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
            <ErrorIcon fontSize="large" color="primary"/>
            <Typography variant="h4"><b>ERROR:</b>{code}</Typography>
        </Box>
        <Typography variant="body1">{message}</Typography>
        {helper && <Typography variant="body1">{helper}</Typography>}
        {routeTo && <Button sx={{mt: 4}} variant="outlined" onClick={goTo}>Home</Button>}
    </Box>
}

export default Error