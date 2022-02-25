interface BasePackageData {
    name: string
    path: string
    description: string
    version: string
}

interface Package extends BasePackageData {
    isClient?: boolean,
    isServer?: boolean,
    isroot?: boolean
}


interface ProjectOpts {
    root?: string,
    hmConf?: object
    orgName?: string,
    environment?: object
    github?: object,
    warnings?: object
}

interface Resolver{
    path: string,
    method: string,
    resolver: string
}

interface Route {
    route: string,
    resolvers: Resolver[]
}

interface Warnings {
    emit: Function
}

