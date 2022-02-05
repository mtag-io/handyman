import React from 'react'
import Box from '@mui/material/Box'
import {List, ListItem, ListItemButton} from '@mui/material'
import router from 'next/router'
import Typography from '@mui/material/Typography'

const modules = [
    {
        name: 'Project',
        path: '/'
    },
    {
        name: 'Environment',
        path: '/environment'
    },
    {
        name: 'Resources',
        path: '/resources'
    },
    {
        name: 'Version',
        path: '/version'
    },
    {
        name: 'Git packages',
        path: '/packages'
    }
]

const Sidebar = () => {

    const nav = path => () => {
        router.push(path).then()
    }

    return <Box m={2}>
        <List>
            {modules.map(mod => (
                <ListItem disablePadding key={mod.path}>
                    <ListItemButton
                        onClick={nav(mod.path)}>
                        <Typography
                            color={'primary.main'}
                            variant="button">
                            {mod.name}
                        </Typography>
                    </ListItemButton>
                </ListItem>)
            )}

        </List>
    </Box>
}

export default Sidebar