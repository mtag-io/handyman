import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useRecoilState} from 'recoil'
import {useFormik} from 'formik'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import dcopy from 'deep-copy'
import {projectAtom} from '../../atoms/project.atom'
import http from '../../utils/http'
import {schema} from './schema'
import {ERROR_ROUTE} from 'common/constants'
import PageHeader from '../layout/PageHeader'
import Button from '@mui/material/Button'
import VersionBump from '../../components/VersionBump'

const Edit = ({info, pkgId}) => {
    const [project, setProject] = useRecoilState(projectAtom)
    const pkg = project.packages[pkgId]
    const router = useRouter()
    const [loader, setLoader] = useState(false)

    const setError = err => {
        router.push(`${ERROR_ROUTE}/${err.code || '500'}`).then()
        if (err.message) console.log(err.message)
    }

    const formik = useFormik({
        initialValues: pkg,
        validationSchema: schema,
        onSubmit: values => {
            const payload = dcopy(project)
            payload.packages[pkgId] = values
            setProject(payload)
            http.client(
                'project.update',
                {
                    setLoader,
                    setError,
                    setData: () => {
                    },
                    body: payload
                }).then()
            info()
        }
    })

    return <Box>
        <PageHeader title="Update package"
                    subTitle="Edit data of project packages"/>
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
                           label="Package name"
                           value={formik.values.name}
                           onChange={formik.handleChange}
                           error={formik.touched['name'] && Boolean(formik.errors['name'])}
                           helperText={formik.touched['name'] && formik.errors['name']}/>
                <TextField
                    id="description"
                    fullWidth
                    multiline
                    name="description"
                    label="Package description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched['description'] && Boolean(formik.errors['description'])}
                    helperText={formik.touched['description'] && formik.errors['description']}/>
                <Box className="flex" ml={2}>
                    <TextField mb={2}
                               id="version"
                               name="version"
                               readOnly={project.syncVersion}
                               label="Package version"
                               value={formik.values.version}
                               onChange={formik.handleChange}
                               error={formik.touched['version'] && Boolean(formik.errors['version'])}
                               helperText={formik.touched['version'] && formik.errors['version']}/>
                    {project.syncVersion && <VersionBump onChange={formik.handleChange} value={formik.values.version}/>}
                </Box>
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