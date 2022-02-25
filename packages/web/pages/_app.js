import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {CacheProvider} from '@emotion/react'
import theme from '../theme'
import createEmotionCache from '../utils/createEmotionCache'
import {RecoilRoot} from 'recoil'
import Layout from '../views/layout/Layout'
import '../styles/global.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function Handyman(props) {

    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Handyman</title>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RecoilRoot>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </RecoilRoot>
            </ThemeProvider>
        </CacheProvider>
    )
}

Handyman.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired
}