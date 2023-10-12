import React from 'react';
import { Button, DataTable, TableBatchAction, TableBatchActions, TableContainer, TableToolbar, TableToolbarAction, TableToolbarContent, TableToolbarMenu, TableToolbarSearch } from 'carbon-components-react';
import { Add, ArrowRight, OrderDetails} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const ClassesDataCard = ({
    tableHeader, 
    data, 
    title, 
    description, 
    mainButtonAction,
    mainButtonText,
    loading=false
}) => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <DataTable rows={data ? data : []} headers={tableHeader} isSortable render={({
                getToolbarProps,
                getBatchActionProps,
                onInputChange,
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
                                    className='cursor-pointer'
                                    onClick={() => {
                                        mainButtonAction()
                                    }}
                                >
                                    {mainButtonText}
                                </Button>
                            </TableToolbarContent>
                        </TableToolbar>
                    </TableContainer>
                    {!data && !loading?
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
                    {data?
                    <div className='flex flex-col pt-4 bg-white gap-8'>
                        {data.map(classInfo => (
                            <React.Fragment>
                            {classInfo?.sub_classes?.length > 0?
                            <div className='flex flex-col bg-white gap-2'>
                                <div className='text-[20px]'>{classInfo.name}</div>
                                <div className='grid md:grid-cols-3 grid-cols-1 gap-4 w-full duration-500'>
                                    
                                    {classInfo.sub_classes?.map(subClassInfo => (
                                    <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-background rounded p-3'>
                                        <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-background rounded text-[18px]'>{subClassInfo.name}</div>
                                        <div 
                                            className='flex gap-2 text-primary text-[14px] cursor-pointer'
                                            onClick={() => {
                                                navigate(`/classes/${classInfo.id}`)
                                            }}
                                        >
                                            View class <ArrowRight />
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            :
                            <div className='flex flex-col justify-between min-w-full h-[108px] bg-background rounded p-3'>
                                <div className='flex flex-col justify-between min-w-full h-[108px] bg-background rounded text-[18px]'>{classInfo.name}</div>
                                <div 
                                    className='flex gap-2 text-primary text-[14px] cursor-pointer'
                                    onClick={() => {
                                        navigate(`/classes/${classInfo.id}`)
                                    }}
                                >
                                    View class <ArrowRight />
                                </div>
                            </div>
                            }
                            </React.Fragment>
                        ))}
                        
                    </div>
                    :null}
                    </React.Fragment>
            } />
        </React.Fragment>
    )
};

export default ClassesDataCard;