export interface Order {
    orderId: number
    createdAt: string
    status: string
    location: Location
}

export interface OrderRow {
    orderId: number
    palletType: PalletType
    product: string
    amount: number
}

export interface Location {
    id: number
    name: string
    address: string
    city: string
    postCode: number
    price: number
    locationType: string
    storages: Storage[]
}
export interface Storage {
    locationId: number
    amount: number
    palletTypeId: number
    palletType: PalletType
}
export interface PalletType {
    palletTypeId: number
    product: string
    amount: number
}
export interface LocationQueryData {
    allLocations: Location[]
}
