import React, {useEffect, useState} from 'react'
import {useRecoilState} from 'recoil'
import {projectAtom} from '../../atoms/project-atom'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import http from '../../utils/http'
import LoadingButton from '@mui/lab/LoadingButton'

const NewProject = ({init, name}) => {
    const [project, setProject] = useRecoilState(projectAtom)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setProject({
            path: init,
            name,
            description: 'New project',
            version: '0.0.1'
        })
    }, [])

    const updateProject = key => e => {
        setProject({...project, [key]: e.target.value})
    }

    const createProject = () => {
        http('create.project', project, {
            setLoader
        })
    }

    const closeApp = () => {
        http('shutdown', {code: 0})
    }

    return <Box ml={2}>
        <Typography variant="h5">New Project</Typography>
        <Typography variant="body2">Initialize a new Handyman project </Typography>
        <Box m={4} ml={0}>
            <Stack spacing={2}>
                <FormControl>
                    <TextField id="name"
                               value={project.name}
                               label="Project name"
                               onChange={updateProject('name')}/>
                </FormControl>
                <FormControl>
                    <TextField value={project.path}
                               label="Project path"
                               onChange={updateProject('path')}/>
                </FormControl>
                <FormControl>
                    <TextField value={project.description}
                               label="Project description"
                               multiline
                               onChange={updateProject('description')}/>
                </FormControl>
                <FormControl>
                    <TextField value={project.version}
                               label="Project version"
                               onChange={updateProject('version')}/>
                </FormControl>
                <Box sx={{display: 'flex', gap: 2}}>
                    <LoadingButton
                        onClick={createProject}
                        loading={loader}
                        variant="outlined"
                        color="primary"
                        disabled={loader}>Create</LoadingButton>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={closeApp}>Cancel</Button>
                </Box>
            </Stack>
        </Box>
    </Box>
}

export default NewProject