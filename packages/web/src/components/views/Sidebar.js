import React from 'react'
import Box from '@mui/material/Box'
import {List, ListItem, ListItemButton} from '@mui/material'
import router from 'next/router'

const Sidebar = () => {

    const nav = path => () => {
        router.push(path).then()
    }

    return <Box m={2}>
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={nav('/')}>
                    Project data
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={nav('/environment')}>
                    Environment
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
}

export default Sidebar