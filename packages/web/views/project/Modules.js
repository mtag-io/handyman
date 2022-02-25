import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import {DEFAULT_DESCRIPTION} from 'common/config'
import React from 'react'
import Box from '@mui/material/Box'
import {useRouter} from 'next/router'
import {PACKAGE_ROUTE} from 'common/constants'

const Modules = ({packages}) => {
    const router = useRouter()

    const goTo = name => () => {
        const pkgId = packages.findIndex(mod => mod.name === name)
        router.push(`${PACKAGE_ROUTE}/${pkgId}`).then()
    }

    return <Box>
        <Typography variant="body1" sx={{mt: 1}}><b>Module packages:</b></Typography>
        <List dense sx={{maxWidth: '40%', ml: 2}}>
            {
                packages.filter(mod => !mod.isRoot).map(mod =>
                    <ListItem
                        sx={{pl: 2}}
                        key={mod.name}
                        button
                        onClick={goTo(mod.name)}
                        disablePadding>
                        <ListItemText
                            primary={mod.name}
                            secondary={mod.description || DEFAULT_DESCRIPTION}/>
                    </ListItem>
                )
            }
        </List>
    </Box>
}

export default Modules