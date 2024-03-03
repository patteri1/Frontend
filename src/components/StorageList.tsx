import { useState, useEffect } from 'react'
import StorageCard from './StorageCard'
import { useQuery } from '@apollo/client'
import { GET_LOCATIONS, GET_PALLET_TYPES } from '../graphql/Queries'
import { LocationQueryData, PalletType } from '../graphql/TypeDefs'

function StorageList() {
    const {
        error,
        loading,
        data: locationData,
    } = useQuery<LocationQueryData>(GET_LOCATIONS)
    const { data: palletTypeData } = useQuery<{ allPalletTypes: PalletType[] }>(
        GET_PALLET_TYPES
    )

    const [storageCardsData, setStorageCardsData] = useState<
        { items: { title: string; content: string }[] }[]
    >([])

    useEffect(() => {
        if (locationData && locationData.allLocations && palletTypeData) {
            const newStorageCardsData = locationData.allLocations.map(
                (location) => {
                    const locationItems = [
                        { title: 'Toimipaikka', content: location.name },
                        {
                            title: 'Osoite',
                            content: `${location.address} ${location.city} ${location.postCode}`,
                        },
                        {
                            title: 'Hinta/lavapaikka/kk',
                            content: location.price.toString(),
                        },
                    ]
                    const storageItems = location.storages.map((storage) => {
                        const palletType = storage.palletType
                        return {
                            title:
                                palletType && palletType.product
                                    ? palletType.product
                                    : 'Unknown Product',
                            content:
                                palletType && palletType.amount
                                    ? `${palletType.amount}`
                                    : 'Unknown Amount',
                        }
                    })

                    return {
                        items: [...locationItems, ...storageItems],
                    }
                }
            )
            setStorageCardsData(newStorageCardsData)
        }
    }, [locationData, palletTypeData])

    const handleCardUpdate = (
        index: number,
        updatedData: { title: string; content: string }[]
    ) => {
        const newData = [...storageCardsData]
        newData[index].items = updatedData
        setStorageCardsData(newData)
    }

    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                storageCardsData.map((data, index) => (
                    <StorageCard
                        key={index}
                        data={data.items}
                        locationName={
                            data.items.find(
                                (item) => item.title === 'Toimipaikka'
                            )?.content || ''
                        }
                        address={
                            data.items.find((item) => item.title === 'Osoite')
                                ?.content || ''
                        }
                        onUpdate={(updatedData) =>
                            handleCardUpdate(index, updatedData)
                        }
                    />
                ))
            )}
        </div>
    )
}

export default StorageList
