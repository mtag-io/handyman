import {empty} from 'common/global'

export default {
    projectGet: (req, res) => {
        const project = req.app.locals.project
        res.status(200).send(project.flush())
    },
    projectUpdate:(req, res) => {
        const project = req.app.locals.project
        try {
            if(empty(req.body) || !req.body.packages)
                return res.status(400).send({
                    error: true,
                    message: 'Invalid update payload'
                })
            project.update(req.body)
            res.status(200).send(req.body)
        } catch(err){
            res.status(500).send({
                error: true,
                message: err.message
            })
        }
    }
}