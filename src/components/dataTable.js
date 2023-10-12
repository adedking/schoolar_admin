import React, { useEffect, useState } from 'react';
import { Button, DataTable, Pagination, Table, TableBatchAction, TableBatchActions, TableBody, TableCell, TableContainer, TableExpandHeader, TableExpandRow, TableExpandedRow, TableHead, TableHeader, TableRow, TableSelectAll, TableSelectRow, TableToolbar, TableToolbarAction, TableToolbarContent, TableToolbarMenu, TableToolbarSearch } from 'carbon-components-react';
import { Add, ArrowRight, OrderDetails} from '@carbon/icons-react';
import { useDispatch } from 'react-redux';
import { IsTurnRightPanelOn } from '../redux/components/components-slice';

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
    onChange: () => {
        
    }
});

const AppDataTable = ({
    tableHeader, 
    mobileTableHeader, 
    loading=false,
    data, 
    title, 
    description, 
    check=true, 
    mainButtonAction,
    mainButtonText,
    showToolBar=true
}) => {
    const [size, setSize] = useState(1000)

    const dispatch = useDispatch();

    const handleRightPanelToggle = () => {
        dispatch(IsTurnRightPanelOn());
    };

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 600) {
            setSize(window.innerWidth)
          } else if (window.innerWidth > 600) {
            setSize(window.innerWidth)
          }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window])
    return (
        <React.Fragment>
            {size > 600 ?
            <DataTable rows={data?.data? data?.data : []} experimentalAutoAlign headers={tableHeader} size='lg' isSortable render={({
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
            }) => 
                <React.Fragment>
                    <TableContainer title={title} description={description} {...getTableContainerProps()}>
                        {showToolBar?
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()}>
                                <TableBatchAction iconDescription="Delete the selected rows" >
                                    Edit
                                </TableBatchAction>
                                <TableBatchAction iconDescription="Save the selected rows" >
                                    Send Announcement
                                </TableBatchAction>
                                <TableBatchAction iconDescription="Download the selected rows" >
                                    Assign To Class
                                </TableBatchAction>
                                <TableBatchAction iconDescription="Download the selected rows" >
                                    Remove Teacher
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} />
                                <TableToolbarMenu>
                                    <TableToolbarAction 
                                    onClick={() => {
                                        
                                    }}>
                                    Add row
                                    </TableToolbarAction>
                                    <TableToolbarAction 
                                        onClick={() => {
                                            
                                        }}
                                    >
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
                        :
                        null}
                        {data?.data?
                        <React.Fragment>
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
                                    <TableRow className='!text-[13px] cursor-pointer min-h-[62px]' onClick={() => {handleRightPanelToggle()}} key={row.id} {...getRowProps({
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
                        </React.Fragment>
                        :
                        null
                        }
                    </TableContainer>
                    {!data?.data && !loading?
                    <div className=' bg-white py-4'>
                        <div className='flex flex-col p-8 px-16 md:min-h-[605px] w-full bg-background gap-3 justify-center items-center'>
                            <div>
                                <OrderDetails width={160} height={160} className='text-primary' />
                            </div>
                            <div className='text-[15px] font-semibold'>
                                No data fetched
                            </div>
                        </div>
                    </div>
                    :
                    null
                    }
    
                </React.Fragment>
            } />
            :
            <DataTable rows={data?.data? data?.data : []} experimentalAutoAlign headers={mobileTableHeader.main} size='lg' render={({
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
            }) => 
                <React.Fragment>
                    <TableContainer title={title} description={description} {...getTableContainerProps()} className='flex md:flex-row flex-col flex-wrap'>
                        {showToolBar?
                        <TableToolbar {...getToolbarProps()}>
                            <TableBatchActions {...getBatchActionProps()}>
                                <TableBatchAction iconDescription="Delete the selected rows" >
                                    Edit
                                </TableBatchAction>
                                <TableBatchAction iconDescription="Save the selected rows" >
                                    Send Announcement
                                </TableBatchAction>
                                <TableBatchAction iconDescription="Download the selected rows" >
                                    Assign To Class
                                </TableBatchAction>
                                <TableBatchAction iconDescription="Download the selected rows" >
                                    Remove Teacher
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} />
                                <TableToolbarMenu>
                                    <TableToolbarAction 
                                    onClick={() => {
                                        
                                    }}>
                                    Add row
                                    </TableToolbarAction>
                                    <TableToolbarAction 
                                    onClick={() => {
                                        
                                    }}>
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
                        :
                        <div class='md:min-h-[605px] w-full bg-background'>
                        </div>}
                        {data?.data?
                        <React.Fragment>
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
                                    <TableExpandRow  
                                        className='!text-[13px]' 
                                        {...getRowProps({
                                            row
                                        })}
                                    >
                                        <TableSelectRow 
                                            {...getSelectionProps({
                                                row
                                            })} 
                                        />
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
                        </React.Fragment>
                        :
                        null}
                        
                    </TableContainer>
                    {!data?.data && !loading?
                    <div className=' bg-white py-4'>
                        <div className='flex flex-col p-8 px-16 md:min-h-[605px] w-full bg-background gap-3 justify-center items-center'>
                            <div>
                                <OrderDetails width={160} height={160} className='text-primary' />
                            </div>
                            <div className='text-[15px] font-semibold'>
                                No data fetched
                            </div>
                        </div>
                    </div>
                    :
                    null
                    }
            
                </React.Fragment>
            } />
            }
        </React.Fragment>
    )
};

export default AppDataTable;