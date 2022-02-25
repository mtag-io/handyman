import {ERROR_ROUTE, SEP} from 'common/constants'

export const getRootPkg = ({packages}) =>
    packages.filter(pkg => pkg.isRoot)[0]

export const errorRoute = code => ERROR_ROUTE.concat(SEP, code || '500')