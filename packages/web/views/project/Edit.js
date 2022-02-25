import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useRecoilState} from 'recoil'
import {useFormik} from 'formik'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import {projectAtom} from '../../atoms/project.atom'
import http from '../../utils/http'
import {Version} from 'common/web'
import {schema} from './schema'
import PageHeader from '../layout/PageHeader'
import Button from '@mui/material/Button'
import {getRootPkg} from '../../utils/helpers'
import VersionBump from '../../components/VersionBump'
import {FormControlLabel, Switch} from '@mui/material'
import {DEFAULT_HM_CONFIG} from 'common/config'
import {ERROR_ROUTE} from 'common/constants'

const Edit = ({info}) => {
    const [project, setProject] = useRecoilState(projectAtom)
    const router = useRouter()
    const [loader, setLoader] = useState(false)

    const setError = err => {
        router.push(`${ERROR_ROUTE}/${err.code}`).then()
    }

    const formik = useFormik({
        initialValues: {
            ...DEFAULT_HM_CONFIG,
            ...getRootPkg(project)
        },
        validationSchema: schema,
        onSubmit: values => {
            const payload = {
                ...project,
                ...values
            }
            setProject(payload)
            http.client(
                'project.update',
                {
                    setLoader,
                    setError,
                    body:
                    payload
                }).then()
            info()
        }
    })

    const handleBump = bumpPart => () => {
        const version = new Version(formik.values.version)
        const bumpAction = [version.incMajor, version.incMinor, version.incPatch]
        // noinspection JSCheckFunctionSignatures
        formik.handleChange({
            target: {
                name: 'version',
                value: bumpAction[bumpPart]()
            }
        })
    }

    return <Box>
        <PageHeader title="Update project"
                    subTitle="The name/description/version data is linked to the root package.json file"/>
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <Box mb={2}>
                    <Typography variant="body1">Package path:</Typography>
                    <Typography variant="subtitle2" mt={1} color="primary.main">{project.path}</Typography>
                    <Typography variant="caption" mt={1}>This property is readonly</Typography>
                </Box>
                <TextField id="name"
                           fullWidth
                           name="name"
                           label="Project name"
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           error={formik.touched['name'] && Boolean(formik.errors['name'])}
                           helperText={formik.touched['name'] && formik.errors['name']}/>
                <TextField
                    id="description"
                    fullWidth
                    multiline
                    name="description"
                    label="Project description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched['description'] && Boolean(formik.errors['description'])}
                    helperText={formik.touched['description'] && formik.errors['description']}/>
                <Box className="flex" ml={2}>
                    <TextField mb={2}
                               id="version"
                               name="version"
                               label="Project version"
                               value={formik.values.version}
                               onChange={formik.handleChange}
                               error={formik.touched['version'] && Boolean(formik.errors['version'])}
                               helperText={formik.touched['version'] && formik.errors['version']}/>
                    <VersionBump handleBump={handleBump()}/>
                </Box>
                <FormControlLabel
                    label="Syncronize version in all modules"
                    sx={{ml: 2}}
                    control={
                        <Switch
                            id="syncVersion"
                            name="syncVersion"
                            checked={formik.values.syncVersion}
                            onChange={formik.handleChange}
                            inputProps={{'aria-label': 'controlled'}}/>
                    }/>
                <Box sx={{display: 'flex', gap: 2, mt: 2}}>
                    <LoadingButton
                        type={'submit'}
                        loading={loader}
                        variant="outlined"
                        color="primary"
                        disabled={loader}>
                        Update
                    </LoadingButton>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={info}>Cancel
                    </Button>
                </Box>
            </Stack>
        </form>
    </Box>
}


export default Edit