import {createTheme} from '@mui/material/styles'
import baseTheme from '../../../__common__/theme.mjs'

const theme = createTheme({
    palette: {
        ...baseTheme
    }
})

export default theme