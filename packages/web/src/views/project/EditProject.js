import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {useRecoilState} from 'recoil'
import {useFormik} from 'formik'
import {projectAtom} from '../../atoms/project-atom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import {schema} from './schema'
import {Version} from '__common__/modules/client'
import {MAJOR, MINOR, PATCH} from '__common__/constants'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import AddCircle from '@mui/icons-material/AddCircle'
import http from '../../utils/http'
import {omit, notEmpty} from '__common__/helpers'

const EditProject = ({newProject}) => {
    const [project, setProject] = useRecoilState(projectAtom)
    const router = useRouter()

    const valid = project && notEmpty(project)

    const [loader, setLoader] = useState(false)
    const setError = query => {
        router.push({pathname: '/error', query}).then()
    }

    const goToInfo = () => {
        router.push('/project-info').then()
    }

    const formik = useFormik({
        initialValues: omit(project, 'newProject', 'hasRootPkg'),
        validationSchema: schema,
        onSubmit: (values) => {
            const payload = {
                ...values,
                hasRootPkg: project.hasRootPkg,
            }
            http(
                'create.project',
                payload,
                {setLoader, setError})
            setProject(payload)
            router.push('/project-info').then()
        }
    })

    const handleBump = bumpPart => () => {
        const version = new Version(formik.values.version)
        const bumpAction = [version.incMajor, version.incMinor, version.incPatch]
        formik.handleChange({target: {name: 'version', value: bumpAction[bumpPart]()}})
    }

    useEffect(() => {
        if(!valid) router.push('/').then()
    })

    return valid ? <Box>
        {
            newProject
                ? <Box sx={{mb: 2}}><Typography variant="h5">New project</Typography>
                    <Typography variant="body2">Initialize a new Handyman project </Typography>
                </Box>
                : <Box sx={{mb: 2}}><Typography variant="h5">Edit project</Typography>
                    <Typography variant="body2">The path of the project is readonly </Typography>
                </Box>
        }
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <Box mb={2}>
                    <Typography variant="body1">Project path:</Typography>
                    <Typography variant="subtitle2" mt={1} color="primary.main">{project.path}</Typography>
                    <Typography variant="caption" mt={1}>This property is readonly</Typography>
                </Box>
                <TextField id="name"
                           fullWidth
                           name="name"
                           label="Project name"
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           error={formik.touched.name && Boolean(formik.errors.name)}
                           helperText={formik.touched.name && formik.errors.name}/>
                <TextField
                    id="description"
                    fullWidth
                    multiline
                    name="description"
                    label="Project description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}/>
                {project.hasRootPkg &&
                    <FormControlLabel
                        label="Syncronize handyman project data to the root package.json"
                        sx={{ml: 2}}
                        control={
                            <Switch
                                id="syncRootPkg"
                                name="syncRootPkg"
                                checked={formik.values.synRooPkg}
                                onChange={formik.handleChange}
                                inputProps={{'aria-label': 'controlled'}}/>
                        }/>
                }
                <FormControlLabel
                    label="Syncronize project data (desc&version) across all package.json's"
                    sx={{ml: 2}}
                    control={
                        <Switch
                            id="syncSubPkg"
                            name="syncSubPkg"
                            checked={formik.values.syncSubPkg}
                            onChange={formik.handleChange}
                            inputProps={{'aria-label': 'controlled'}}/>
                    }/>
                <Box className="flex" ml={2}>
                    <TextField mb={2}
                               id="version"
                               name="version"
                               label="Project version"
                               value={formik.values.version}
                               onChange={formik.handleChange}
                               error={formik.touched.version && Boolean(formik.errors.version)}
                               helperText={formik.touched.version && formik.errors.version}/>
                    <Box className="flex-around" sx={{ml: 1, border: 1, borderColor: 'grey.500', pl: 2, pr: 2}}>
                        <IconButton
                            onClick={handleBump(MAJOR)}
                            color="primary"
                            aria-label="delete">
                            <AddCircle/>
                        </IconButton>
                        <IconButton
                            onClick={handleBump(MINOR)}
                            color="primary"
                            aria-label="delete">
                            <AddCircle/>
                        </IconButton>
                        <IconButton
                            onClick={handleBump(PATCH)}
                            color="primary"
                            aria-label="delete">
                            <AddCircle/>
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', gap: 2, mt: 2}}>
                    <LoadingButton
                        type={'submit'}
                        loading={loader}
                        variant="outlined"
                        color="primary"
                        disabled={loader}>
                        {newProject ? 'Create' : 'Update'}
                    </LoadingButton>
                    {!newProject && <Button
                        variant="outlined"
                        color="primary"
                        onClick={goToInfo}>Cancel</Button>}
                </Box>
            </Stack>
        </form>
    </Box> : <h5>Redirecting...</h5>
}


export default EditProject