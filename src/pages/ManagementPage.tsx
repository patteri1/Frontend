import { useQuery } from '@apollo/client'
import LocationList from '../components/LocationList'
import Page from '../components/Page'
import { GET_LOCATION_BY_ID } from '../graphql/Queries'
import { useLoginInfo } from '../hooks/useLoginInfo'

const ManagementPage = () => {
    const isAdmin = useLoginInfo()
    const { loading, error, data } = useQuery(GET_LOCATION_BY_ID, {
        variables: { locationId: 1 },
    })
    return (
        <Page>
            <div style={{ paddingTop: 20 }}>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>Hallinnointi</p>
                {isAdmin ? <LocationList /> : <pre>{JSON.stringify(data)}</pre>}
            </div>
        </Page>
    )
}

export default ManagementPage
