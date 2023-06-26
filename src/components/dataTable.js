import React from 'react';
import { DataTable, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'carbon-components-react';


const AppDataTable = ({data}) => {

    const rows = [
        {
            id: 'load-balancer-1',
            name: 'Load Balancer 1',
            rule: 'Round robin',
            Status: 'Starting',
            other: 'Test',
            example: '22',
        },
        {
            id: 'load-balancer-1',
            name: 'Load Balancer 1',
            rule: 'Round robin',
            Status: 'Starting',
            other: 'Test',
            example: '22',
        },
    ];
    const headers = ['Name', 'Rule', 'Status', 'Other', 'Example'];
    return (
        <DataTable rows={rows} headers={headers}>
            {({ rows, headers}) => (
                <Table size="lg" useZebraStyles={true} >
                    <TableHead>
                        <TableRow>
                        {headers.map((header) => (
                            <TableHeader id={header.key} key={header}>
                            {header}
                            </TableHeader>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                {Object.keys(row)
                                .filter((key) => key !== 'id')
                                .map((key) => {
                                    return <TableCell key={key}>{row[key]}</TableCell>
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </DataTable>
    );
};

export default AppDataTable;