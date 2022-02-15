interface BasePackageData{
    name: string
    path: string
    description: string
    version: string
}

interface Package extends BasePackageData{
    isClient?: boolean,
    isServer?: boolean,
    isroot?: boolean
}

interface Project extends BasePackageData{
    syncSubPkg: boolean,
    packages: Package[]
}

interface ProjectOpts{
    root?: string,
    hmConf?: object
    orgName?:string,
    environment?: object
    github?:object
}