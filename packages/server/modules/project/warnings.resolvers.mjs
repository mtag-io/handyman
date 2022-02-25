const warnings = {
    warningsGet: (req, res) => {
        const prj = req.app.locals.project
        res.status(200).send(prj.warningQueue)
    },

    warningsDelete: (req, res) => {
        const id = req.params.id
        const prj = req.app.locals.project
        prj.warningQueue.splice(id, 1)
        res.status(200).send(prj.warningQueue)
    }
}

export default warnings