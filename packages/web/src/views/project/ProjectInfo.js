import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useRecoilValue} from 'recoil'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import {projectAtom} from '../../atoms/project-atom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import {DEFAULT_DESCRIPTION} from '__common__/config'
import Button from '@mui/material/Button'
import {notEmpty} from '__common__/helpers'

const ProjectInfo = () => {
    /** @type {Project} project **/
    const project = useRecoilValue(projectAtom)
    const router = useRouter()
    const valid = project && notEmpty(project)

    useEffect(() => {
        if (!valid) router.push('/').then()
    })

    const goToEdit = () => {
        router.push('/edit-project').then()
    }
    return valid
        ? <Box>
            <Box sx={{mb: 2}}>
                <Typography variant="h5">Project info:</Typography>
                <Typography variant="body2">Information about the curent's project structure and
                    properties </Typography>
            </Box>

            <Box className="flex">
                <Typography variant="body1"><b>Project name:</b></Typography>
                <Typography variant="body2" color="primary">&nbsp;{project.name}</Typography>
            </Box>
            <Box className="flex">
                <Typography variant="body1"><b>Project path:</b></Typography>
                <Typography variant="body2" color="primary">&nbsp;{project.path}</Typography>
            </Box>
            <Box className="flex">
                <Typography variant="body1"><b>Project description:</b></Typography>
                <Typography variant="body2" color="primary">&nbsp;{project.description}</Typography>
            </Box>
            <Box className="flex">
                <Typography variant="body1"><b>Project version:</b></Typography>
                <Typography variant="body2" color="primary">&nbsp;{project.version}</Typography>
            </Box>
            <Typography variant="body1" sx={{mt: 1}}><b>Packages:</b></Typography>
            <List dense sx={{maxWidth: '50%'}}>
                {
                    project.packages.map(pkg => <ListItem
                            key={pkg['name']}
                            secondaryAction={
                                <IconButton edge="end" aria-label="edit">
                                    <EditIcon color="primary"/>
                                </IconButton>
                            } disablePadding>
                            <ListItemIcon>
                                <Inventory2Icon/>
                            </ListItemIcon>
                            <ListItemText
                                primary={pkg['name']}
                                secondary={pkg['description'] || DEFAULT_DESCRIPTION}/>
                        </ListItem>
                    )
                }
            </List>
            <Box className="flex" sx={{mt: 2}}>
                <Typography variant="body1"><b>Has root package.json:</b></Typography>
                <Typography variant="body2">&nbsp; {project.hasRootPkg ? 'Yes' : 'No'}</Typography>
            </Box>
            <Button
                sx={{mt: 2}}
                variant="outlined"
                color="primary"
                onClick={goToEdit}>Edit
            </Button>

        </Box>
        : <h5>Redirecting...</h5>
}

export default ProjectInfo