import React from 'react';
import { Button, DataTable, Loading, TableBatchAction, TableBatchActions, TableContainer, TableToolbar, TableToolbarAction, TableToolbarContent, TableToolbarMenu, TableToolbarSearch } from 'carbon-components-react';
import { Add, AddFilled, ArrowRight, OrderDetails} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import AppButton from './app-button';
import { ImportExport } from '@carbon/icons-react';

const ClassesDataCard = ({
    tableHeader, 
    data, 
    title, 
    description, 
    mainButtonAction,
    mainButtonText,
    loading=false,
    emptyText,
    emptySubText,
    emptyLinkText
}) => {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <DataTable rows={data ? data : []} headers={tableHeader} isSortable render={({
                getToolbarProps,
                getBatchActionProps,
                onInputChange,
                getTableContainerProps
            }) => 
                <React.Fragment>
                    
                    {loading ?
                    <div className='flex flex-col p-8 px-16 min-h-[530px] w-full bg-background gap-4 justify-center items-center'>
                        <Loading className={''} withOverlay={false} small={false} />
                    </div>
                    : !data && !loading ?
                    <div className='flex flex-col p-4 px-8 min-h-[530px] w-full bg-background gap-3 justify-center items-start'>
                        <div>
                            <OrderDetails width={80} height={80} className='text-primary' />
                        </div>
                        <div className='text-[20px] px-3'>
                            {emptyText}
                        </div>
                        <div className='text-[14px] font-normal px-3 max-w-[400px]'>
                            {emptySubText}
                        </div>
                        <div className='w-fit flex gap-4 px-3'>
                            <AppButton
                                type="button" 
                                kind={'primary'} 
                                renderIcon={ImportExport}
                                action={() => {

                                }}
                                text={'Auto Import Classes'}
                            />
                            <AppButton
                                type="button" 
                                kind={'primary'} 
                                renderIcon={AddFilled}
                                action={() => {

                                }}
                                text={'Add Classes'}
                            />
                        </div>
                    </div>
                    :
                    <React.Fragment>
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
                                        className='!w-[200px]'
                                        onClick={() => {
                                            mainButtonAction()
                                        }}
                                    >
                                        {mainButtonText}
                                    </Button>
                                </TableToolbarContent>
                            </TableToolbar>
                        </TableContainer>
                        <div className='flex flex-col pt-4 bg-white gap-8'>
                            {data.map(classInfo => (
                                <React.Fragment>
                                {classInfo?.sub_classes?.length > 0?
                                <div className='flex flex-col bg-white gap-2 '>
                                    <div className='text-[20px]'>{classInfo.name}</div>
                                    <div className='grid md:grid-cols-3 grid-cols-1 gap-4 w-full duration-500'>
                                        {classInfo.sub_classes?.map(subClassInfo => (
                                        <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-background rounded p-3'>
                                            <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[108px] bg-background rounded text-[18px]'>{classInfo.name} - {subClassInfo.name}</div>
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
                    </React.Fragment>
                    }
                </React.Fragment>
            } />
        </React.Fragment>
    )
};

export default ClassesDataCard;