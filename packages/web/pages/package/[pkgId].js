import {useRouter} from 'next/router'
import Package from '../../views/package/Package'
import redirector from '../../utils/redirector'

export default () => {
    const router = useRouter()
    const {pkgId} = router.query
    redirector()
    return <Package pkgId={pkgId}/>
}