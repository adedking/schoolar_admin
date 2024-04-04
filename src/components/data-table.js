/* eslint-disable eqeqeq */
/* eslint-disable no-lone-blocks */
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
    TableToolbarSearch 
} from 'carbon-components-react';
import { Add, ArrowRight, OrderDetails} from '@carbon/icons-react';
import { PAGINATION_DEFAULT } from '../utils';
import { StatusCell } from './fragments/data-table-fragments/status-cell';
import { useNavigate } from 'react-router-dom';
import { ParentCell } from './fragments/data-table-fragments/parent-cell';
import AppButton from './app-button';

const AppDataTable = ({
    tableHeader, 
    mobileTableHeader, 
    loading=false,
    data, 
    title, 
    description, 
    searchData=true,
    check=true, 
    mainButtonAction=()=>{},
    viewActionType=null,
    mainButtonText,
    multipleButtonText,
    showToolBar=true,
    pagination,
    setPagination=()=>{},
    emptyText,
    emptySubText,
    emptyLinkText,
    statusConfig=null,
    addMultiple=false,
    showMainButton=true,
    addMultipleAction=()=>{},
    showEmptyInfo=true,
    showEmptyButton=true
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
        onChange: (pageInfo) => {
            setPagination({
                limit: pageInfo.pageSize,
                page: pageInfo.page,
                statusFilter: PAGINATION_DEFAULT.statusFilter,
                search: pagination ? pagination.search : '',
            })
        }
    });
    const [size, setSize] = useState(1000)

    const [search, setSearch] = useState(pagination?.search)

    const updatePagination = (limit, page, filter, search) => {
        setPagination({
            limit: limit,
            page: page,
            statusFilter: filter,
            search: search,
        })
    }

    const navigate = useNavigate();

    const viewAction = (id, class_id=null, term_id=null) => {
        if (viewActionType === 'teacher') {
            navigate(`/teachers/${id}`)
        } else if (viewActionType === 'student') {
            navigate(`/students/${id}`)
        } else if (viewActionType === 'parent') {
            navigate(`/parents-guardians/${id}`)
        } else if (viewActionType === 'session') {
            navigate(`/sessions/${id}`)
        } else if (viewActionType === 'subject') {
            navigate(`/classes/${class_id}/${id}`)
        } else if (viewActionType === 'term') {
            navigate(`/sessions/${id}/academic-terms/${term_id}`)
        } else if (viewActionType === 'transportation') {
            navigate(`/transportation/${id}`)
        } else if (viewActionType === 'fees') {
            navigate(`/fees-management/${id}`)
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
            <React.Fragment>
            {size > 600 ?
                <DataTable rows={data?.data? data?.data : []} experimentalAutoAlign headers={tableHeader} size='lg' isSortable render={({
                    rows,
                    // headers,
                    getHeaderProps,
                    getSelectionProps,
                    getToolbarProps,
                    getBatchActionProps,
                    getRowProps,
                    // onInputChange,
                    // selectedRows,
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
                                    <TableToolbarSearch
                                        value={search} 
                                        disabled={!searchData}
                                        onInput={(e) => {
                                            if (e.target.value) {
                                                setSearch(e.target.value)
                                                updatePagination(pagination?.limit ? pagination.limit : PAGINATION_DEFAULT.limit, 1, pagination?.statusFilter, e.target.value)
                                            } else {
                                                setSearch('')
                                                updatePagination(pagination?.limit ? pagination.limit : PAGINATION_DEFAULT.limit, 1, pagination?.statusFilter, '')
                                            }
                                            
                                        }}
                                    />
                                    {data?.data?
                                    <>
                                        {addMultiple ? 
                                        <AppButton 
                                            text={multipleButtonText}
                                            renderIcon={Add} 
                                            kind={'tertiary'}
                                            action={() => {
                                                addMultipleAction()
                                            }}
                                        />
                                        :
                                        null}
                                        {showMainButton?
                                        <AppButton 
                                            text={mainButtonText}
                                            kind={'primary'} 
                                            renderIcon={Add} 
                                            action={() => {
                                                mainButtonAction()
                                            }}
                                        />
                                        :
                                        null}
                                    </>
                                    :
                                    null
                                    }
                                </TableToolbarContent>
                            </TableToolbar>
                            :
                            null}
                            {loading?
                            <div className=' bg-white py-4'>
                                <div className='flex flex-col p-8 min-h-[450px] w-full bg-background gap-4 justify-center items-center'>
                                    <Loading active={loading} className={''} withOverlay={false} small={false} />
                                </div>
                            </div>
                            :
                            data?.data ?
                            <React.Fragment>
                                <Table 
                                    {...getTableProps()}
                                >
                                    <TableHead>
                                        <TableRow>
                                            {check?<TableSelectAll {...getSelectionProps()} />:null}
                                            {tableHeader.map((header, i) => (
                                                <>
                                                {header.header === 'id' || header.header === 'class_id' ?
                                                null :
                                                <TableHeader key={i} {...getHeaderProps({
                                                    header
                                                })}>
                                                    {header.header}
                                                </TableHeader>}
                                                </>))
                                            }
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => 
                                        <TableRow 
                                            className='!text-[13px] cursor-pointer' 
                                            onClick={() => {
                                                if (viewActionType === 'subject') {
                                                    viewAction(row.cells[0].value, row.cells[1].value)
                                                } else {
                                                    viewAction(row.cells[0].value)
                                                }
                                            }}
                                            key={row.id} 
                                            {...getRowProps({
                                                row
                                            })}
                                        >
                                            {check?
                                                <TableSelectRow {...getSelectionProps({row})} />
                                            :null}
                                            {row.cells.map(cell => (
                                                <>
                                                    {cell.id.split(":")[1] === 'id' || cell.id.split(":")[1] === 'uuid'  || cell.id.split(":")[1] === 'class_id' ?
                                                    null 
                                                    : cell.id.split(":")[1] === 'status'?
                                                    <StatusCell
                                                        code={cell.value}
                                                        statusConfig={statusConfig}
                                                    />
                                                    : cell.id.split(":")[1] === 'parents'?
                                                    <ParentCell 
                                                        guardian_info={cell.value}
                                                    />
                                                    :
                                                    <TableCell key={cell.id}>{cell.value ? cell.value : '-' }</TableCell>
                                                    }
                                                    
                                                </>
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

                        <div className='flex flex-col p-4 !px-2 md:min-h-[350px] w-full bg-background gap-3 justify-center items-start -mt-16'>
                            {showEmptyInfo?
                            <>
                                <div>
                                    <OrderDetails width={80} height={120} className='text-primary'/>
                                </div>
                                <div className='text-[18px] px-3'>
                                    {emptyText}
                                </div>
                                <div className='text-[12px] font-normal max-w-[400px] px-3'>
                                    {emptySubText}
                                </div>
                                <div className='flex  px-3'>
                                    {addMultiple ? 
                                    <AppButton 
                                        text={multipleButtonText}
                                        renderIcon={Add}
                                        kind={'tertiary'}
                                        action={() => {
                                            addMultipleAction()
                                        }}
                                    />
                                    :
                                    null}
                                    {showEmptyButton ?
                                    <AppButton 
                                        text={mainButtonText}
                                        kind={'primary'}
                                        action={() => {
                                            mainButtonAction()
                                        }}
                                        renderIcon={ArrowRight} 
                                    />
                                    :
                                    null
                                    }
                                    
                                </div>
                                {emptyLinkText?
                                <div className='text-[14px] font-normal max-w-[400px]'>
                                    {emptyLinkText}
                                </div>
                                :
                                null
                                }
                            </>
                            : null}
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
                            {loading?
                            <div className=' bg-white py-4'>
                                <div className='flex flex-col p-8 px-16 min-h-[450px] w-full bg-background gap-4 justify-center items-center'>
                                    <Loading active={loading} className={''} withOverlay={false} small={false} />
                                </div>
                            </div>
                            : data?.data?
                            <React.Fragment>
                                <Table {...getTableProps()}>
                                    <TableHead>
                                        <TableRow>
                                            <TableExpandHeader />
                                            <TableSelectAll {...getSelectionProps()} />
                                            {mobileTableHeader.main.map((header, i) => (
                                                <>
                                                {header.header === 'id' || header.header === 'class_id' ?
                                                null :
                                                <TableHeader key={i} {...getHeaderProps({
                                                    header
                                                })}>
                                                    {header.header}
                                                </TableHeader>}
                                                </>))
                                            }
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
                                            {row.cells.map(cell => (
                                                // <div>{cell.id.split(":")[1]}</div>
                                                <>
                                                    {cell.id.split(":")[1] === 'id' || cell.id.split(":")[1] === 'uuid' || cell.id.split(":")[1] === 'class_id' ?
                                                    null 
                                                    : cell.id.split(":")[1] === 'status'?
                                                    <StatusCell
                                                        code={cell.value}
                                                        statusConfig={statusConfig}
                                                    />
                                                    : cell.id.split(":")[1] === 'primary_guardian' && cell.value?
                                                    <ParentCell 
                                                        name={`${cell.value.first_name} ${cell.value.first_name}`}
                                                        mobile={cell.value.mobile}
                                                    />
                                                    :
                                                    <TableCell key={cell.id}>{cell.value ? cell.value : '-' }</TableCell>
                                                    }
                                                    
                                                </>
                                            ))}
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
                        <div className='flex flex-col p-2 md:min-h-[450px] w-full bg-background gap-3 justify-center items-start'>
                            <div>
                                <OrderDetails width={80} height={80} className='text-primary' />
                            </div>
                            <div className='text-[18px]'>
                                {emptyText}
                            </div>
                            <div className='text-[12px] font-normal max-w-[400px]'>
                                {emptySubText}
                            </div>
                            <div>
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
            </React.Fragment>
            
        </React.Fragment>
    )
};

export default AppDataTable;