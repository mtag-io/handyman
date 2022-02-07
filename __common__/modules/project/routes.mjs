import Project from './project.class.mjs'

const routes = router => {

    router.post('/', (req, res) => {
        const project = new Project(req.body)
        try {
            project.write()
            res.status(200).send({success: true})
        } catch (err) {
            res.status(500).send(err)
        }
    })

    router.put('/', (req, res) => {
        const project = new Project(req.body)
        try {
            project.write()
            res.status(200).send({success: true})
        } catch (err) {
            res.status(500).send(err)
        }
    })

    return router
}

export default routes