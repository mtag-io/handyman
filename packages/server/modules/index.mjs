import {default as operational} from './routes/operationals.mjs'

export {default as Project} from './project/project.class.mjs'
export {default as Package} from './package/package.class.mjs'
export {default as Routes} from './routes/routes.class.mjs'
export {default as Environment} from './environment/environment.class.mjs'
export const resolvers = {
    ...operational
}
