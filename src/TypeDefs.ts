export interface Order {
    orderId: number
    locationId: number
    locationName: String
    datetime: String
    status: String
}

export interface OrderRow {
    orderId: number
    product: String
    amount: number
}
