import {useRouter} from 'next/router'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ErrorIcon from '@mui/icons-material/Error'
import React from 'react'
import {ERROR_CONTENT} from '__common__/config'

const Error = () => {
    const router = useRouter()
    let err = router.query
    if (ERROR_CONTENT[err.message])
        err = ERROR_CONTENT[err.message]
    if (ERROR_CONTENT[err.code])
        err = ERROR_CONTENT[err.code]
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
            <Typography variant="h4"><b>ERROR:</b> {err.code && err.code}</Typography>
        </Box>
        <Typography variant="body1">{err.message}</Typography>
        {err.helper && <Typography variant="body1">{err.helper}</Typography>}
    </Box>
}

export default Error