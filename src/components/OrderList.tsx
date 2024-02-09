import "./App.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface Row {
  name: string;
  status: string;
  date: string;
}

function createData(name: string, status: string, date: string): Row {
  return { name, status, date };
}

const rows: Row[] = [
  createData("Kuljetusliike 1", "Avattu", "1.12.2023"),
  createData("Kuljetusliike 2", "Avattu", "2.12.2023"),
  createData("Kuljetusliike 3", "Valmis", "3.12.2023"),
  createData("Kuljetusliike 4", "Valmis", "4.12.2023"),
];

export default function DenseTable() {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Row | null>(null);

  const handleClickOpen = (row: Row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 325 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell> Tilaaja </TableCell>
              <TableCell align="right"> Status </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleClickOpen(row)}
                style={{ cursor: "pointer" }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedRow && selectedRow.name}</DialogTitle>
        <DialogContent>
          <p>Status: {selectedRow && selectedRow.status}</p>
          <p>Tilattu: {selectedRow && selectedRow.date}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Sulje</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
