import { useState, useEffect } from 'react'
import StorageCard from './StorageCard'
import { useQuery } from '@apollo/client'
import { GET_LOCATIONS} from '../graphql/Queries'
import { LocationQueryData } from '../graphql/TypeDefs'
import { useMutation } from '@apollo/client';
import {SET_AMOUNT_TO_STORAGE } from '../graphql/Queries';

function StorageList() {
    const {
        error,
        loading,
        data: locationData,
    } = useQuery<LocationQueryData>(GET_LOCATIONS)

    const [storageCardsData, setStorageCardsData] = useState<
        { items: { title: string; content: string }[] }[]
    >([])

    const [locationIds] = useState<number[]>([])

    const [setAmountToStorage] = useMutation(SET_AMOUNT_TO_STORAGE);

    const setAmountToStorageHandler = async (locationId: number, palletTypeId: number, amount: number) => {
        try {
            const { data } = await setAmountToStorage({
                variables: { locationId, palletTypeId, amount },
            });
            console.log('Updated amount for palletType:', data.setAmountToStorage);
        } catch (error) {
            console.error('Error setting amount for PalletType', error);
        }
    };

    useEffect(() => {
        if (locationData && locationData.allLocations) {
          const newStorageCardsData = locationData.allLocations.map((location) => {
            const locationItems = [
              { title: 'Toimipaikka', content: location.name },
              { title: 'Osoite', content: `${location.address} ` },
              { title: 'Hinta/lavapaikka/kk', content: location.price.toString() },
            ];
            const storageItems = location.storages.map((storage) => {
              return {
                title: storage.palletType ? storage.palletType.product : 'Unknown Product',
                content: storage.amount ? `${storage.amount}` : 'Unknown Amount',
                palletTypeId: storage.palletTypeId,
                locationId: storage.locationId,
              };
            });
    
            return {
              items: [...locationItems, ...storageItems],
            };
          });
          setStorageCardsData(newStorageCardsData);
        }
    }, [locationData]);

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
                        locationId={locationIds[index]}
                        locationName={
                            data.items.find(
                                (item) => item.title === 'Toimipaikka'
                            )?.content || ''
                        }
                        address={
                            data.items.find((item) => item.title === 'Osoite')
                                ?.content || ''
                        }
                        onUpdate={(updatedData) => handleCardUpdate(index, updatedData)}
                        onStorageUpdate={(palletTypeId, amount) =>
                            setAmountToStorageHandler(locationIds[index], palletTypeId, amount)
                        }
                    />
                ))
            )}
        </div>
    )
}

export default StorageList
