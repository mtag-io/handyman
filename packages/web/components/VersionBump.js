import IconButton from '@mui/material/IconButton'
import {MAJOR, MINOR, PATCH} from 'common/constants'
import AddCircle from '@mui/icons-material/AddCircle'
import Box from '@mui/material/Box'
import React from 'react'
import {Version} from 'common/web'



const VersionBump = ({value, onChange}) => {

    const handleBump = bumpPart => () => {
        const version = new Version(value)
        const bumpAction = [version.incMajor, version.incMinor, version.incPatch]
        onChange({
            target: {
                name: 'version',
                value: bumpAction[bumpPart]()
            }
        })
    }


    return <Box className="flex-around" sx={{ml: 1, border: 1, borderColor: 'grey.500', pl: 2, pr: 2}}>
        <IconButton
            onClick={handleBump(MAJOR)}
            color="primary"
            aria-label="delete">
            <AddCircle/>
        </IconButton>
        <IconButton
            onClick={handleBump(MINOR)}
            color="primary"
            aria-label="delete">
            <AddCircle/>
        </IconButton>
        <IconButton
            onClick={handleBump(PATCH)}
            color="primary"
            aria-label="delete">
            <AddCircle/>
        </IconButton>
    </Box>
}
export default VersionBump