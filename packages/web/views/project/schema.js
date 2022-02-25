import * as yup from 'yup'
import {SEMVER_REGEXP} from 'common/config'

export const schema = yup.object({
    newProject: yup.boolean(),
    syncRootPkg: yup.boolean(),
    syncSubPkg: yup.boolean(),
    name: yup
        .string('Package name')
        .matches(/^[a-z_]+$/, 'Only lower case and underscore alowed (npm))')
        .required('Package name is required'),
    description: yup
        .string('Package description')
        .required('A minimal description is required'),
    version: yup
        .string('Package version')
        .matches(SEMVER_REGEXP, 'Semver format required')
        .required('A minimal description is required')
})