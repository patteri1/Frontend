export interface Location {
    id: string
    name: string
    address: string
    postCode: string
    price: number
}

export interface Order {
    orderId: number
    createdAt: string
    status: string
    location: Location
}

export interface OrderRow {
    orderId: number
    palletType: PalletType
    amount: number
}

export interface PalletType {
    palletTypeId: number
    product: string
    amount: number
}
