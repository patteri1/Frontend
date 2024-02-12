import React, { useState, useEffect } from 'react';
import StorageCard from './StorageCard';
import { useQuery, gql } from '@apollo/client';

interface Location {
    id: string;
    name: string;
    address: string;
    city: string;
    postalCode: number;
    price: number;
    storages: Storage[];
}
interface Storage {
    locationId: string;
    amount: number;
}
interface PalletType {
    palletTypeId: string;
    product: string;
    amount: number;
}
interface LocationQueryData {
    allLocations: Location[];
}

const GET_LOCATIONS = gql`
    query {
        allLocations {
            id
            name
            address
            price
            storages {
                locationId
                amount
            }
        }
    }
`;
/* postalCode
city */
const GET_PALLET_TYPES = gql`
    query {
        allPalletTypes {
            palletTypeId
            product
            amount
        }
    }
`;
function StoragePage() {
    const { error, loading, data: locationData } = useQuery<LocationQueryData>(GET_LOCATIONS);
    const { data: palletTypeData } = useQuery<{ allPalletTypes: PalletType[] }>(GET_PALLET_TYPES);

    const [storageCardsData, setStorageCardsData] = useState<{ items: { title: string; content: string }[] }[]>([]);

    useEffect(() => {
        if (locationData && locationData.allLocations && palletTypeData) {
            const newStorageCardsData = locationData.allLocations.map((location) => {
                const locationItems = [
                    { title: 'Toimipaikka', content: location.name },
                    { title: 'Osoite', content: `${location.address} ` }, //${location.city} ${location.postalCode}
                    { title: 'Hinta/lavapaikka/kk', content: location.price.toString() }
                ];
                const palletTypeItems = palletTypeData.allPalletTypes.map(palletType => ({
                    title: palletType.product,
                    content: `${palletType.amount}`,
                }));

                return {
                    items: [...locationItems, ...palletTypeItems],
                };
            });
            setStorageCardsData(newStorageCardsData);
        }
    }, [locationData, palletTypeData]);

    const handleCardUpdate = (
        index: number,
        updatedData: { title: string; content: string }[]
    ) => {
        const newData = [...storageCardsData];
        newData[index].items = updatedData;
        setStorageCardsData(newData);
    };

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
                        onUpdate={(updatedData) =>
                            handleCardUpdate(index, updatedData)
                        }
                    />
                ))
            )}
        </div>
    );
}

export default StoragePage;
import Page from '../components/Page'

const StoragePage = () => {
    return (
        <Page>
            <div>
                <p>Varasto</p>
            </div>
        </Page>
    )
}

export default StoragePage
