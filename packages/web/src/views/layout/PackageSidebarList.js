import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'
import {useRecoilValue} from 'recoil'
import {projectAtom} from '../../atoms/project-atom'
import {useRouter} from 'next/router'

const PackageSidebarList = () => {
    const [open, setOpen] = React.useState(false)
    const project = useRecoilValue(projectAtom)
    const router = useRouter()

    const packages = project && project.packages

    const handleClick = () => {
        setOpen(!open)
    }

    const goToPackage = idx => () => {
        router.push(`/package-info/${idx}`).then()
    }

    return packages && <>
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
                {packages.map((mod, idx) =>
                    <ListItemButton
                        onClick={goToPackage(idx)}>
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