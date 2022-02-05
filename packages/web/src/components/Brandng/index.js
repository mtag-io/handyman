import { useTheme } from '@mui/styles'

export const Logo = ({size}) => {

    const theme = useTheme()

    return <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 200 200"
        style={{width: size + 'px', height: size + 'px'}}>
        <path style={{fill: '#ffffff'}} d="M145.1,10.8V49H54.9V10.8C22.3,27.2,0,61,0,100s22.3,72.8,54.9,89.2v-55.9h90.3v55.9
	C177.7,172.8,200,139,200,100S177.7,27.2,145.1,10.8z"/>
        <path style={{fill: theme['palette'].secondary.main}} d="M141.8,146.4c0,0-13-37.6-19.4-56.4c-0.6-2.8-17.1,18.4-23.5,26c-0.4,0.5-0.6,0.5-1,0
	c-6.6-7.9-22.6-28.2-23.3-26.3c-6.5,18.7-19.6,56-19.6,56l-23.8-20.1l37.5-76.4c0,0,19.1,21.8,28.7,32.6c1,1.2,31.8-32.8,31.8-32.8
	l36.3,76.6L141.8,146.4z"/>
    </svg>
}
