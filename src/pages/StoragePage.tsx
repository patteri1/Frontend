import { useState, useEffect } from 'react'
import StorageCard from '../components/StorageCard'
import { useQuery, gql } from '@apollo/client'
import Page from '../components/Page'
import { useMutation } from '@apollo/client';
import {SET_AMOUNT_TO_STORAGE } from '../graphql/mutations';

interface Location {
    id: number
    name: string
    address: string
    city: string
    postalCode: number
    price: number
    storages: Storage[]
}
interface Storage {
    locationId: number
    amount: number
    palletTypeId: number
    palletType: PalletType
}
interface PalletType {
    palletTypeId: number
    product: string
    amount: number
}
interface LocationQueryData {
    allLocations: Location[]
}

const GET_LOCATIONS = gql`
  query {
    allLocations {
      name
      address
      price
      storages {
        locationId
        palletTypeId
        amount
        palletType {
          product
        }
      }
    }
  }
`;



function StoragePage() {
    const {
        error,
        loading,
        data: locationData,
    } = useQuery<LocationQueryData>(GET_LOCATIONS)
    
    const [storageCardsData, setStorageCardsData] = useState<
        { items: {title: string; content: string}[] }[]
    >([])

    const [locationIds, setLocationIds] = useState<number[]>([])

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
          const newStorageCardsData = locationData.allLocations.map(
            (location) => {
              const locationItems = [
                { title: 'Toimipaikka', content: location.name },
                { title: 'Osoite', content: `${location.address} ` }, //${location.city} ${location.postalCode}
                {
                  title: 'Hinta/lavapaikka/kk',
                  content: location.price.toString(),
                },
              ];
              const storageItems = location.storages.map((storage) => {
                return {
                  title: storage.palletType ? storage.palletType.product : 'Unknown Product',
                  content: storage.amount ? `${storage.amount}` : 'Unknown Amount',
                  palletTypeId: storage.palletTypeId,
                  locationId: storage.locationId,  // Add locationId here
                };
              });
              setLocationIds((prevLocationIds) => [...prevLocationIds, location.id]);
      
              return {
                items: [...locationItems, ...storageItems],
              };
            }
          );
          setStorageCardsData(newStorageCardsData);
        }
      }, [locationData]);

    const handleCardUpdate = (
        index: number,
        updatedData: { title: string; content: string; palletTypeId?: number  }[]
    ) => {
        const newData = [...storageCardsData]
        newData[index].items = updatedData
        setStorageCardsData(newData)
    }

    return (
        <Page>
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
                        locationId={locationIds[index]} // Pass locationId to StorageCard
                        locationName={
                            data.items.find((item) => item.title === 'Toimipaikka')?.content || ''
                        }
                        onUpdate={(updatedData) => handleCardUpdate(index, updatedData)}
                        onStorageUpdate={(palletTypeId, amount) =>
                            setAmountToStorageHandler(locationIds[index], palletTypeId, amount)
                        }
                    />
                ))
                )}
            </div>
        </Page>
    )
}

export default StoragePage