import React from 'react';
import { Button, DataTable, TableBatchAction, TableBatchActions, TableContainer, TableToolbar, TableToolbarAction, TableToolbarContent, TableToolbarMenu, TableToolbarSearch } from 'carbon-components-react';
import { Add, ArrowRight} from '@carbon/icons-react';

const ClassesDataCard = ({
    tableHeader, 
    data, 
    title, 
    description, 
    mainButtonAction,
    mainButtonText
}) => {
    return (
        <React.Fragment>
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
            }) => <React.Fragment>
                    <TableContainer title={title} description={description} {...getTableContainerProps()}>
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
                    </TableContainer>
                    <div className='flex flex-col p-4 bg-white gap-6'>
                        <div className='flex flex-col bg-white gap-2'>
                            <div className='text-[18px]'>Class 12</div>
                            <div className='grid md:grid-cols-3 grid-cols-1 gap-4 w-full duration-500'>
                                <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded p-3'>
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded text-[18px]'>12 - A</div>
                                    <div className='flex gap-2 text-[#0F62FE] text-[14px] cursor-pointer'>View class <ArrowRight /></div>
                                </div>
                                <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded p-3'>
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded text-[18px]'>12 - B</div>
                                    <div className='flex gap-2 text-[#0F62FE] text-[14px] cursor-pointer'>View class <ArrowRight /></div>
                                </div>
                                <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded p-3'>
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded text-[18px]'>12 - C</div>
                                    <div className='flex gap-2 text-[#0F62FE] text-[14px] cursor-pointer'>View class <ArrowRight /></div>
                                </div>
                                <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded p-3'>
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded text-[18px]'>12 - D</div>
                                    <div className='flex gap-2 text-[#0F62FE] text-[14px] cursor-pointer'>View class <ArrowRight /></div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col bg-white gap-2'>
                            <div className='text-[18px]'>Class 13</div>
                            <div className='grid md:grid-cols-3 grid-cols-1 gap-4 w-full duration-500'>
                                <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded p-3'>
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded text-[18px]'>13 - A</div>
                                    <div className='flex gap-2 text-[#0F62FE] text-[14px] cursor-pointer'>View class <ArrowRight /></div>
                                </div>
                                <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded p-3'>
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded text-[18px]'>13 - B</div>
                                    <div className='flex gap-2 text-[#0F62FE] text-[14px] cursor-pointer'>View class <ArrowRight /></div>
                                </div>
                                <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded p-3'>
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded text-[18px]'>13 - C</div>
                                    <div className='flex gap-2 text-[#0F62FE] text-[14px] cursor-pointer'>View class <ArrowRight /></div>
                                </div>
                                <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded p-3'>
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-login-background rounded text-[18px]'>13 - D</div>
                                    <div className='flex gap-2 text-[#0F62FE] text-[14px] cursor-pointer'>View class <ArrowRight /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    </React.Fragment>
            } />
        </React.Fragment>
    )
};

export default ClassesDataCard;