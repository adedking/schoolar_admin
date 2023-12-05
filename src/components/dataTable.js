/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { 
    Button, 
    DataTable, 
    Loading, 
    Pagination, 
    Table, 
    TableBatchAction, 
    TableBatchActions, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableExpandHeader, 
    TableExpandRow, 
    TableExpandedRow, 
    TableHead, 
    TableHeader, 
    TableRow, 
    TableSelectAll, 
    TableSelectRow, 
    TableToolbar, 
    TableToolbarAction, 
    TableToolbarContent, 
    TableToolbarMenu,
    TableToolbarSearch } from 'carbon-components-react';
import { Add, ArrowRight, OrderDetails} from '@carbon/icons-react';
import { useDispatch } from 'react-redux';
import { IsTurnRightPanelOn } from '../redux/components/components-slice';
import { PAGINATION_DEFAULT } from '../utils';
import { StatusCell } from './statusCell';
import { useNavigate } from 'react-router-dom';

const AppDataTable = ({
    tableHeader, 
    mobileTableHeader, 
    loading=false,
    data, 
    title, 
    description, 
    check=true, 
    mainButtonAction=()=>{},
    viewActionType=null,
    mainButtonText,
    showToolBar=true,
    pagination,
    setPagination,
    emptyText,
    emptySubText,
    emptyLinkText,
    statusConfig=null,
}) => {

    const props = () => ({
        disabled: false,
        page: pagination? pagination.page : PAGINATION_DEFAULT.page,
        totalItems: data? data.total : 0,
        pagesUnknown: false,
        nextPage: null,
        pageInputDisabled: false,
        pageSizeInputDisabled: false,
        backwardText: 'Previous page',
        forwardText: 'Next page',
        pageSize: pagination? pagination.limit : PAGINATION_DEFAULT.limit,
        pageSizes: PAGINATION_DEFAULT.pageSizes,
        itemsPerPageText: '',
        onChange: () => {
            
        }
    });
    const [size, setSize] = useState(1000)

    const dispatch = useDispatch();

    const handleRightPanelToggle = () => {
        dispatch(IsTurnRightPanelOn());
    };

    const navigate = useNavigate();

    const viewAction = (id) => {
        if (viewActionType === 'teacher') {
            navigate(`/teachers/${id}`)
        }
    }

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
            {loading?
            <div className=' bg-white py-4'>
                <div className='flex flex-col p-8 px-16 min-h-[450px] w-full bg-background gap-4 justify-center items-center'>
                    <Loading active={loading} className={''} withOverlay={false} small={false} />
                </div>
            </div>
            :
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
                                    Remove
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} />
                                {data?.data?
                                <Button 
                                    renderIcon={Add} 
                                    onClick={() => {
                                        mainButtonAction()
                                    }}
                                >{mainButtonText}</Button>
                                :
                                null
                                }
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
                                    <TableRow 
                                        className='!text-[14px] cursor-pointer min-h-[64px]' 
                                        onClick={() => {viewAction(row.id)}}
                                        key={row.id} 
                                        {...getRowProps({
                                            row
                                        })}
                                    >
                                        {check?
                                            <TableSelectRow {...getSelectionProps({row})} />
                                        :null}
                                        {row.cells.map(cell => (
                                            // <div>{cell.id.split(":")[1]}</div>
                                            <React.Fragment>
                                                {cell.id.split(":")[1] === 'status'?
                                                <StatusCell
                                                    code={cell.value}
                                                    statusConfig={statusConfig}
                                                />
                                                :
                                                <TableCell key={cell.id}>{cell.value}</TableCell>
                                                }
                                                
                                            </React.Fragment>
                                        ))}
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                            {pagination && setPagination?
                            <Pagination {...props()} />
                            :
                            null
                            }
                        </React.Fragment>
                        :
                        null
                        }
                    </TableContainer>
                    {!data?.data && !loading ?
                    <div className='flex flex-col p-4 px-8 md:min-h-[350px] w-full bg-background gap-3 justify-center items-start -pt-8'>
                        <div>
                            <OrderDetails width={80} height={80} className='text-primary' />
                        </div>
                        <div className='text-[18px] px-3'>
                            {emptyText}
                        </div>
                        <div className='text-[12px] font-normal px-3 max-w-[400px]'>
                            {emptySubText}
                        </div>
                        <div className='px-3'>
                            <Button 
                                renderIcon={ArrowRight} 
                                onClick={() => {
                                    mainButtonAction()
                                }}
                            >{mainButtonText}</Button>
                        </div>
                        {emptyLinkText?
                        <div className='text-[14px] font-normal px-3 max-w-[400px]'>
                            {emptyLinkText}
                        </div>
                        :
                        null
                        }
                        
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
                                <TableBatchAction iconDescription="Delete the selected rows" className='flex flex-col ' >
                                    Edit
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch onChange={onInputChange} />
                                {data?.data?
                                <Button 
                                    renderIcon={Add} 
                                    onClick={() => {
                                        mainButtonAction()
                                    }}
                                >
                                    {mainButtonText}
                                </Button>
                                :
                                null
                                }
                                
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
                                        className='!text-[14px]' 
                                        {...getRowProps({
                                            row
                                        })}
                                    >
                                        {check?
                                            <TableSelectRow {...getSelectionProps({row})} />
                                        :null}
                                        {row.cells.map(cell => <TableCell key={cell.id}>{cell.value}</TableCell>)}
                                    </TableExpandRow>
                                    <TableExpandedRow colSpan={headers.length + 3} className="demo-expanded-td">
                                        <h6>Expandable row content</h6>
                                        <div>Description here</div>
                                        <div 
                                            className='flex gap-2 text-primary text-[13px] cursor-pointer justify-end'
                                        >
                                            View <ArrowRight />
                                        </div>
                                    </TableExpandedRow>
                                    </React.Fragment>)}
                                </TableBody>
                            </Table>
                            {pagination && setPagination?
                            <Pagination {...props()} />
                            :
                            null
                            }
                        </React.Fragment>
                        :
                        null}
                        
                    </TableContainer>
                    {!data?.data && !loading ?
                    <div className='flex flex-col p-4  md:min-h-[450px] w-full bg-background gap-3 justify-center items-start'>
                        <div>
                            <OrderDetails width={80} height={80} className='text-primary' />
                        </div>
                        <div className='text-[18px] px-3'>
                            {emptyText}
                        </div>
                        <div className='text-[12px] font-normal px-3 max-w-[400px]'>
                            {emptySubText}
                        </div>
                        <div className='px-3'>
                            <Button 
                                renderIcon={ArrowRight} 
                                onClick={() => {
                                    mainButtonAction()
                                }}
                            >{mainButtonText}</Button>
                        </div>
                        {/* <div className='text-[14px] font-normal px-3 max-w-[400px]'>
                            {emptyLinkText}
                        </div> */}
                    </div>
                    :
                    null
                    }
            
                </React.Fragment>
            } />
            }
            </React.Fragment>}
            
        </React.Fragment>
    )
};

export default AppDataTable;