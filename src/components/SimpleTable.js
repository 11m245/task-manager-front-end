import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// const defaultColumns = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "mobile", label: "Mobile", minWidth: 100 },
//   {
//     id: "email",
//     label: "Email",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "address",
//     label: "Address",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "balance",
//     label: "Balance",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value,
//   },
//   {
//     id: "options",
//     label: "Options",
//     minWidth: 50,
//     align: "right",
//     buttons: ["edit"],
//   },
// ];

// const defaultAllRows = [
//   {
//     name: "name1",
//     mobile: 123456789,
//     email: "email1",
//     address: "address1",
//     balance: 1000,
//   },
//   {
//     name: "name2",
//     mobile: 123456789,
//     email: "email2",
//     address: "address2",
//     balance: 2000,
//   },
// ];

function SimpleTable({ columns, allRows }) {
  const [rows, setRows] = React.useState(allRows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (e) => {
    const filteredRows = allRows.filter((row) =>
      row.customerName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    //use row.name has filter field make change necessary for appropriate field
    // console.log("filtered rows", filteredRows);
    setRows(filteredRows);
  };

  return (
    <>
      <div className="filter-container d-flex justify-content-center gap-2">
        <input
          type="text"
          onChange={handleFilterChange}
          placeholder="Enter Customer Name to Filter"
          style={{
            borderRadius: "10px",
            border: "1px solid blue",
            padding: "2px",
            paddingInline: "5px",
          }}
        />
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* <TableContainer sx={{ maxHeight: 440 }}>  for table height*/}
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "blue",
                      border: "2px solid white",
                      borderRadius: "10px",
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length < 1 ? <p>no data</p> : null}
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.taskId}
                      sx={
                        i % 2 !== 0
                          ? { backgroundColor: "#5ab7d6" }
                          : { backgroundColor: "lightblue" }
                      }
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={i % 2 !== 0 ? { color: "blue" } : null}
                          >
                            {column.format && typeof value === "number"
                              ? new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: "INR",
                                }).format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export { SimpleTable };
