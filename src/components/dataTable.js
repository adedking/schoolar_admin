import React from 'react';
import { Button, DataTable, Pagination, Table, TableBatchAction, TableBatchActions, TableBody, TableCell, TableContainer, TableExpandHeader, TableExpandRow, TableExpandedRow, TableHead, TableHeader, TableRow, TableSelectAll, TableSelectRow, TableToolbar, TableToolbarAction, TableToolbarContent, TableToolbarMenu, TableToolbarSearch } from 'carbon-components-react';
import { Add, Edit, Information, TrashCan } from '@carbon/icons-react';


const props = () => ({
    disabled: false,
    page: 1,
    totalItems: 103,
    pagesUnknown: false,
    pageInputDisabled: false,
    pageSizeInputDisabled: false,
    backwardText: 'Previous page',
    forwardText: 'Next page',
    pageSize: 10,
    pageSizes: [10, 20, 30, 40, 50],
    itemsPerPageText: '',
    onChange: 'onChange'
});

const AppDataTable = ({
    tableHeader, 
    mobileTableHeader, 
    data, 
    title, 
    description, 
    check=true, 
    mainButtonAction,
    mainButtonText
}) => {

    return (
        <div className='flex flex-col'>
            <div className='hidden md:block'>
                <DataTable rows={data?.data} headers={tableHeader} isSortable render={({
                    rows,
                    headers,
                    getHeaderProps,
                    getSelectionProps,
                    getToolbarProps,
                    getBatchActionProps,
                    getRowProps,
                    onInputChange,
                    selectedRows,
                    getTableProps,
                    getTableContainerProps
                }) => <TableContainer title={title} description={description} {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()}>
                                <TableBatchAction renderIcon={''} iconDescription="Delete the selected rows" >
                                    Edit
                                </TableBatchAction>
                                <TableBatchAction  renderIcon={''} iconDescription="Save the selected rows" >
                                    Send Announcement
                                </TableBatchAction>
                                <TableBatchAction renderIcon={''} iconDescription="Download the selected rows" >
                                    Assign To Class
                                </TableBatchAction>
                                <TableBatchAction renderIcon={''} iconDescription="Download the selected rows" >
                                    Remove Teacher
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} />
                                <TableToolbarMenu>
                                    <TableToolbarAction >
                                    Add row
                                    </TableToolbarAction>
                                    <TableToolbarAction >
                                    Add header
                                    </TableToolbarAction>
                                </TableToolbarMenu>
                                <Button 
                                    renderIcon={Add} 
                                    onClick={() => {
                                        mainButtonAction()
                                    }}
                                >{mainButtonText}</Button>
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table {...getTableProps()}>
                            <TableHead>
                                <TableRow>
                                    {check?<TableSelectAll {...getSelectionProps()} />:null}
                                    {tableHeader.map((header, i) => <TableHeader key={i} {...getHeaderProps({
                                        header
                                    })}>
                                        {header.header}
                                    </TableHeader>)}
                                </TableRow>
                            </TableHead>
                            <TableBody
                                
                            >
                            {rows.map(row => 
                                <TableRow className='!text-[13px]' key={row.id} {...getRowProps({
                                    row
                                })}>
                                    {check?
                                        <TableSelectRow {...getSelectionProps({row})} />
                                    :null}
                                    {row.cells.map(cell => <TableCell key={cell.id}>{cell.value}</TableCell>)}
                                </TableRow>
                            )}
                            </TableBody>
                        </Table>
                        <Pagination {...props()} />
                        </TableContainer>
                } />
            </div>
            <div className='md:hidden block'>
                <DataTable className='!w-full' rows={data?.data} headers={mobileTableHeader.main} render={({
                    rows,
                    headers,
                    getHeaderProps,
                    getSelectionProps,
                    getToolbarProps,
                    getBatchActionProps,
                    getRowProps,
                    onInputChange,
                    selectedRows,
                    getTableProps,
                    getTableContainerProps
                }) => <TableContainer title={title} description={description} {...getTableContainerProps()}>
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()}>
                            <TableBatchAction renderIcon={Edit} iconDescription="Delete the selected rows" >
                                Edit
                            </TableBatchAction>
                            <TableBatchAction renderIcon={Information} iconDescription="Save the selected rows" >
                                Send Announcement
                            </TableBatchAction>
                            <TableBatchAction renderIcon={Add} iconDescription="Download the selected rows" >
                                Assign To Class
                            </TableBatchAction>
                            <TableBatchAction renderIcon={TrashCan} iconDescription="Download the selected rows" >
                                Remove Teacher
                            </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                            <TableToolbarSearch onChange={onInputChange} />
                            <TableToolbarMenu>
                                <TableToolbarAction >
                                Add row
                                </TableToolbarAction>
                                <TableToolbarAction >
                                Add header
                                </TableToolbarAction>
                            </TableToolbarMenu>
                            <Button renderIcon={Add}>Add Teacher</Button>
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table {...getTableProps()}>
                            <TableHead>
                            <TableRow>
                                <TableExpandHeader />
                                <TableSelectAll {...getSelectionProps()} />
                                {mobileTableHeader.main.map((header, i) => <TableHeader key={i} {...getHeaderProps({
                                    header
                                })}>
                                    {header.header}
                                </TableHeader>)}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map(row => <React.Fragment key={row.id}>
                                <TableExpandRow {...getRowProps({
                            row
                        })}>
                                    <TableSelectRow {...getSelectionProps({
                            row
                            })} />
                                    {row.cells.map(cell => <TableCell key={cell.id}>{cell.value}</TableCell>)}
                                </TableExpandRow>
                                <TableExpandedRow colSpan={headers.length + 3} className="demo-expanded-td">
                                    <h6>Expandable row content</h6>
                                    <div>Description here</div>
                                </TableExpandedRow>
                                </React.Fragment>)}
                            </TableBody>
                        </Table>
                        <Pagination {...props()} />
                        </TableContainer>
                } />
            </div>
        </div>
    )
};

export default AppDataTable;