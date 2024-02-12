import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import OrderInfo from './OrderInfo'
import { useQuery, gql } from '@apollo/client'

export interface Order {
    orderId: number
    datetime: string
    status: string
    location: Location
}

interface Location {
    id: string
    name: string
    address: string
    postCode: string
    price: number
}

const GET_ORDERS = gql`
    query AllOrders {
        allOrders {
            orderId
            datetime
            status
            location {
                name
            }
        }
    }
`

export default function OrderList() {
    const { loading, error, data } = useQuery(GET_ORDERS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <div>
            <TableContainer sx={{ padding: 2 }} component={Paper}>
                <Table
                    sx={{ minWidth: 325 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell> Tilaaja </TableCell>
                            <TableCell align="center"> Tilauspvm </TableCell>
                            <TableCell align="right"> Status </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.allOrders.map((row: Order) => (
                            <TableRow
                                key={row.orderId}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.location.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.datetime}
                                </TableCell>
                                <TableCell align="right">
                                    {row.status}
                                </TableCell>
                                <TableCell>
                                    <OrderInfo id={row.orderId} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
