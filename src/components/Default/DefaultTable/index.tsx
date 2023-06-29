import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from "@mui/material";
import NoData from "./../NoData";

import { DefaultTableProps, ColumnProps } from "./../../../_interfaces";
export default function DefaultTable({ columns, tbody, length, page, setPage, rowsPerPage, setRowsPerPage }: DefaultTableProps) {
    const handleChangePage = (ev: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+ev.target.value);
        setPage(0);
    };
    return (
        <>
            <TableContainer color="info">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <GenerateThead columns={columns} />
                    </TableHead>

                    <TableBody>
                        {length > 0 ? tbody : <TableNoData colSpan={columns.length} />}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={length}
                
                page={page}
                onPageChange={handleChangePage}

                labelDisplayedRows={() => ""}

                labelRowsPerPage="Itens por página:"
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
function GenerateThead({ columns }: { columns: any[] }){
    return(
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.id}
                    align={column.align}
                    style={column.style}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}
function TableNoData({ colSpan }: {colSpan: number}){
    return(
        <TableRow>
            <TableCell colSpan={colSpan}>
                <NoData />
            </TableCell>
        </TableRow>
    );
}