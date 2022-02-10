import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {Logo} from './Brandng'
import Sidebar from '../views/Sidebar'
import {useRouter} from 'next/router'
import http from '../utils/http'

const Layout = ({children}) => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const router = useRouter()
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleProfile = () => {
        setAnchorEl(null)
        router.push('/profile').then()
    }

    const handleLogout = () => {
        setAnchorEl(null)
        http('shutdown')
        router.push('/logout').then()
    }


    return (
        <Box sx={{height: '100vh'}}>
            <AppBar position="sticky">
                <Toolbar>
                    <Logo size="36"/>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1}}
                        ml={1}>
                        Handyman
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}>
                        <MenuItem onClick={handleProfile}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Grid container sx={{
                height: 'calc(100% - 72px)',
                mt: 1
            }}>
                <Grid item xs={3}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={9} sx={{display: 'flex', mt: 3}}>
                    <Container>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Layout