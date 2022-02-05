import Project from './project.mjs'

const projectRoutes = router => {

    router.post('/', (req, res) => {
        const project = new Project(req.body)
        try {
            project.init()
            res.status(200).send({success: true})
        }catch(err){
            res.status(500).send({eror: true, message: err.message})
        }
    })

    router.put('/', (req, res) => {
        const project = new Project(req.body)
        try {
            project.init()
            res.status(200).send({success: true})
        }catch(err){
            res.status(500).send({eror: true, message: err.message})
        }
    })

    return router
}

export default projectRoutes