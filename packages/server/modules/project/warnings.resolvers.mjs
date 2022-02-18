import {DELETE_WARNING, GET_WARNINGS} from 'common/config'

const warnings = {
    [GET_WARNINGS]: (req, res) => {
        const prj = req.app.locals.project
        res.status(200).send(prj.warningQueue)
    },

    [DELETE_WARNING]: (req, res) => {
        const id = req.params.id
        const prj = req.app.locals.project
        prj.warningQueue.splice(id, 1)
        res.status(200).send(prj.warningQueue)
    }
}

export default warnings