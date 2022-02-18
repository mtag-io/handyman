import {hmShutdown} from 'common/server'

// shutdown Handyman - both client and server backends
export const shutdown = (_, res) => {
    hmShutdown()
    res.status(200).send({
        success: true,
        mewssage: 'Handyman server is shuting down.'
    })
}

const operationals = {
    shutdown
}

export default operationals