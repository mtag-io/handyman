import Error from '../../components/Error'

export default () => <Error
        message="No data received from the server"
        code="510"
        helper="Please check server status and logs."
    />