import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { DocumentNode, useQuery } from '@apollo/client'
import OrderInfo from './OrderInfo'
import { Order } from '../graphql/TypeDefs'

interface OrderListProps {
    query: DocumentNode
    orderData: string
    title?: string
}

const convertDate = (d: string) => {
    const date = new Date(Number(d)).toString()

    return date
}

export default function OrderList({ query, orderData, title }: OrderListProps) {
    const { loading, error, data } = useQuery(query)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>
    return (
        <div style={{ paddingTop: 20 }}>
            <p style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</p>
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
                        {data[orderData].map((row: Order) => (
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
                                    {convertDate(row.createdAt)}
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
