export interface Order {
    orderId: number
    location: Location
    status: string
    createdAt: string
    updatedAt: string
    orderRows: OrderRow[]
}

export interface OrderRow {
    orderId: number
    product: Product
    //productName: string
    palletAmount: number
}

export interface Location {
    locationId: number
    locationName: string
    address: string
    postCode: number
    city: string
    locationType: string
    storages: Storage[]
}

export interface Storage {
    locationId: number
    palletAmount: number
    productId: string
    product: Product
}
export interface Product {
    productId: number
    productName: string
    productAmount: number
}

export interface LocationQueryData {
    allLocations: Location[]
}
