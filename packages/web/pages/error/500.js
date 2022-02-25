import Error from '../../components/Error'

export default () => <Error
        message="Internal server Error"
        code="500"
        helper="Please check server status and logs."
    />