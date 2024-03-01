import LocationList from '../components/LocationList'
import Page from '../components/Page'

const ManagementPage = () => {
    return (
        <Page>
            <div style={{ paddingTop: 20 }}>
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>Hallinnointi</p>

                <LocationList />
            </div>
        </Page>
    )
}

export default ManagementPage
