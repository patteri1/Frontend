export interface Order {
    orderId: number
    locationId: number
    locationName: string
    datetime: string
    status: string
}

export interface OrderRow {
    orderId: number
    product: string
    amount: number
}
export interface Location {
    id: string
    name: string
    address: string
    city: string
    postCode: number
    price: number
    storages: Storage[]
}
export interface Storage {
    locationId: string
    amount: number
    palletTypeId: string
    palletType: PalletType
}
export interface PalletType {
    palletTypeId: string
    product: string
    amount: number
}
export interface LocationQueryData {
    allLocations: Location[]
}
