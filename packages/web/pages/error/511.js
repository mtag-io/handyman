import Error from '../../components/Error'

export default () => <Error
        message="A connection to the server could not be established"
        code="511"
        helper="Please check server status and logs."
    />