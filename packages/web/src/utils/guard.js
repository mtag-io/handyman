import {empty} from 'common/global'

export const initGuard = (router, project) => [
    () => {
        if (empty(project))
            router.push('/').then()
    }, []]