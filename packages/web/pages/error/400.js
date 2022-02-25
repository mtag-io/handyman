import Error from '../../components/Error'

export default () => <Error
        message="Bad request"
        code="400"
        helper="The data you sent to the server is invalid"
    />