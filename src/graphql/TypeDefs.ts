export interface Order {
    orderId: number
    location: Location
    status: string
    createdAt: string
    updatedAt: string
}

export interface OrderRow {
    orderId: number
    product: Product
    //productName: string
    palletAmount: number
}
export interface Location {
    locationId: string
    locationName: string
    address: string
    postCode: number
    city: string
    locationType: string
    storages: Storage[]
    locationPrices?: {'price': number, 'validFrom': Date}[]
}
export interface Storage {
    locationId: string
    palletAmount: number
    productId: string
    product: Product
}
export interface Product {
    productId: string
    productName: string
    productAmount: number
}
export interface LocationQueryData {
    allLocations: Location[]
}
