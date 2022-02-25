import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import {useRecoilValue} from 'recoil'
import {projectAtom} from '../../atoms/project.atom'
import {useRouter} from 'next/router'
import {PACKAGE_ROUTE} from 'common/constants'

const PackageSidebarList = () => {
    const [open, setOpen] = React.useState(false)
    const project = useRecoilValue(projectAtom)
    const router = useRouter()

    const packages = project && project.packages || []

    const handleClick = () => {
        setOpen(!open)
    }

    const goToPackage = name => () => {
        const pkgId = packages.findIndex(mod => mod.name === name)
        router.push(`${PACKAGE_ROUTE}/${pkgId}`).then()
    }

    return <>
        <ListItemButton onClick={handleClick}>
            <Typography
                color={'primary.main'}
                variant="button">
                Packages
            </Typography>
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding sx={{ml: 2}}>
                {packages.filter(mod => !mod.isRoot).map(mod =>
                    <ListItemButton
                        key={mod.name}
                        onClick={goToPackage(mod.name)}>
                        <Typography
                            color={'primary.main'}
                            variant="button">
                            {mod.name}
                        </Typography>
                    </ListItemButton>
                )}
            </List>
        </Collapse>
    </>
}

export default PackageSidebarList