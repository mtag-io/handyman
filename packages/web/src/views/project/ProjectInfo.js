import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useRecoilValue} from 'recoil'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import {projectAtom} from '../../atoms/project-atom'
import {DEFAULT_DESCRIPTION} from 'common/config'
import {notEmpty} from 'common/global'
import MainInfo from '../../components/MainInfo'

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

    const goToPackage = (id) => () => {
        router.push(`/package-info/${id}`).then()
    }

    return valid
        ? <Box>
            <Box sx={{mb: 2}}>
                <Typography variant="h5">Project info:</Typography>
                <Typography variant="body2">Information about the curent's project structure and
                    properties </Typography>
            </Box>

            <MainInfo project={project}/>
            <Typography variant="body1" sx={{mt: 1}}><b>Module packages:</b></Typography>
            <List dense sx={{maxWidth: '40%', ml: 2}}>
                {
                    project.packages.map((pkg, idx) =>
                        <ListItem
                            sx={{pl: 2}}
                            key={pkg['name']}
                            button
                            secondaryAction={
                                <IconButton
                                    onClick={goToPackage(idx)}
                                    edge="end"
                                    aria-label="edit">
                                    <EditIcon color="primary"/>
                                </IconButton>
                            } disablePadding>
                            <ListItemText
                                primary={pkg['name']}
                                secondary={pkg['description'] || DEFAULT_DESCRIPTION}/>
                        </ListItem>
                    )
                }
            </List>
            <Box className="flex" sx={{mt: 2}}>
                <Typography variant="body1"><b>Has root package.json:</b></Typography>
                <Typography variant="body2" color="primary">&nbsp; {project.hasRootPkg ? 'Yes' : 'No'}</Typography>
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