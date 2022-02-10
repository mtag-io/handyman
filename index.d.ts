interface Project{
    name: string
    path: string
    description: string
    version: string
    hasRootPkg: boolean,
    syncRootPkg: boolean
    syncSubPkg: boolean,
    packages: object[]
}