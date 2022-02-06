import * as yup from 'yup'
import {SEMVER_REGEXP} from '__common__/config'

export const schema = yup.object({
    name: yup
        .string('Project name')
        .matches(/^[a-z_]+$/, 'Only lower case and underscore alowed (npm))')
        .required('Project name is required'),
    description: yup
        .string('Project description')
        .required('A minimal description is required'),
    version: yup
        .string('Project version')
        .matches(SEMVER_REGEXP, 'Semver format required')
        .required('A minimal description is required'),
})