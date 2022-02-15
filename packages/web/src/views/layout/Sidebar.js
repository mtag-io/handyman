import React from 'react'
import Box from '@mui/material/Box'
import {List, ListItem, ListItemButton} from '@mui/material'
import router from 'next/router'
import Typography from '@mui/material/Typography'
import {MODULES} from 'common/config'


const Sidebar = () => {

    const nav = path => () => {
        router.push(path).then()
    }

    return <Box m={2}>
        <List>
            {MODULES.map(mod => (

                        <ListItem disablePadding key={mod.path}>
                            <ListItemButton
                                onClick={nav(mod.path)}>
                                <Typography
                                    color={'primary.main'}
                                    variant="button">
                                    {mod.name}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                )
            )}
        </List>
    </Box>
}

export default Sidebar