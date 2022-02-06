import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useRecoilState} from 'recoil'
import {useFormik} from 'formik'
import {projectAtom} from '../../../atoms/project-atom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import http from '../../../utils/http'
import {schema} from './schema'
import {Version} from '__common__'
import {MAJOR, MINOR, PATCH} from '__common__/constants'

const EditProject = ({newProject, ...project}) => {
    const setProject = useRecoilState(projectAtom)[1]
    const [loader, setLoader] = useState(false)
    const router = useRouter()


    const setError = query => {
        router.push({pathname: '/error', query}).then()
    }

    const formik = useFormik({
        initialValues: project,
        validationSchema: schema,
        onSubmit: (values) => {
            http('create.project', values, {setLoader, setError})
            setProject(values)
        }
    })

    const closeApp = () => {
        http('shutdown', {code: 0})
    }

    const handleBump = bumpPart => () => {
        const version = new Version(formik.values.version)
        const bumpAction = [version.incMajor, version.incMinor, version.incPatch]
        formik.handleChange({target: {name: 'version', value: bumpAction[bumpPart]()}})
    }

    return <Box ml={2}>
        {
            newProject
                ? <Box><Typography variant="h5">New project</Typography>
                    <Typography variant="body2">Initialize a new Handyman project </Typography>
                </Box>
                : <Box><Typography variant="h5">Edit project</Typography>
                    <Typography variant="body2">The path of the project is readonly </Typography>
                </Box>
        }

        <Box m={4} ml={0}>
            <Stack spacing={2}>
                <Box mb={2}>
                    <Typography variant="body1">Project path:</Typography>
                    <Typography variant="subtitle2" mt={1} color="primary.main">{project.path}</Typography>
                    <Typography variant="caption" mt={1}>This property is readonly</Typography>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <Box mb={2}>
                        <TextField id="name"
                                   fullWidth
                                   name="name"
                                   label="Project name"
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   error={formik.touched.name && Boolean(formik.errors.name)}
                                   helperText={formik.touched.name && formik.errors.name}/>
                    </Box>
                    <Box mb={2}>
                        <TextField mb={2}
                                   id="description"
                                   fullWidth
                                   multiline
                                   name="description"
                                   label="Project description"
                                   value={formik.values.description}
                                   onChange={formik.handleChange}
                                   error={formik.touched.description && Boolean(formik.errors.description)}
                                   helperText={formik.touched.description && formik.errors.description}/>
                    </Box>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField mb={2}
                                       id="version"
                                       fullWidth
                                       name="version"
                                       label="Project version"
                                       value={formik.values.version}
                                       onChange={formik.handleChange}
                                       error={formik.touched.version && Boolean(formik.errors.version)}
                                       helperText={formik.touched.version && formik.errors.version}/>
                        </Grid>
                        <Grid
                            item xs={6}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                            <Button
                                variant="outlined"
                                onClick={handleBump(MAJOR)}>
                                Bump major
                            </Button>
                            <Button
                                variant="outlined"
                                ml={1}
                                onClick={handleBump(MINOR)}>
                                Bump minor
                            </Button>
                            <Button
                                variant="outlined"
                                ml={1}
                                onClick={handleBump(PATCH)}>
                                Bump major
                            </Button>
                        </Grid>
                    </Grid>
                    <Box sx={{display: 'flex', gap: 2, mt: 2}}>
                        <LoadingButton
                            type={'submit'}
                            loading={loader}
                            variant="outlined"
                            color="primary"
                            disabled={loader}>
                            {newProject ? 'Create' : 'Update'}
                        </LoadingButton>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={closeApp}>Cancel</Button>
                    </Box>
                </form>
            </Stack>
        </Box>
    </Box>
}

export default EditProject