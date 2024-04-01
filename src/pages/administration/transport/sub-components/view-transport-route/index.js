/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppButton from '../../../../../components/app-button';
import { Edit, TrashCan } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import TabView from '../../../../../components/tabs';
import profilePix from '../../../../../assets/svg/profile-pix-placeholder.svg';
import TransportRouteDetails from './transport-route-details';
import TransportRouteStudents from './transport-route-students';
import AddStudentToTransportRouteModal from '../modals/add-student-to-route';
import DeleteModal from '../../../../../components/modals/deleteModal';
import { useDeleteTransportationRoute, useGetTransportationRoute, useRemoveDriverFromRoute } from '../../../../../redux/administration/transportation/hook';
import AssignDriverToRouteModal from '../modals/assign-driver-to-route';
import AddTransportModal from '../modals/add-transport-route';

const ViewTransportPage = () => {

    const [showAssignDriverToRoute, setShowAssignDriverToRoute] = useState(false);
    const [showAddTransportRoute, setShowAddTransportRoute] = useState(false);
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [showAddMultipleStudents, setShowAddMultipleStudents] = useState(false);
    const [driverId, setDriverId] = useState(null)
    const [type, setType] = useState('add');
    const [showDelete, setShowDelete] =useState(false)

    const [deleteTitle, setDeleteTitle] =useState('')
    const [deleteText, setDeleteText] =useState('')
    const [deleteButtonText, setDeleteButtonText] =useState('')
    const [deleteType, setDeleteType] =useState('')

    const navigate = useNavigate();

    const tabs = [
        {
            title: 'Details',
            content: <TransportRouteDetails />,
        },
        {
            title: 'Students',
            content: <TransportRouteStudents  setShowAddStudent={setShowAddStudent}  />
        },
        
    ];

    const {id} = useParams();
    const { data: transportRoute, isLoading: transportRouteLoading } = useGetTransportationRoute(id);
    const {mutateAsync: removeTransportRoute, isLoading: removeRouteLoading} = useDeleteTransportationRoute()
    const {mutateAsync: removeDriver, isLoading: removeDriverLoading} = useRemoveDriverFromRoute()

    const deleteRouteFn = async () => {
        await removeTransportRoute(id).then(() => {
            setShowDelete(false)
            navigate('/transportation')
        })
    }

    const removeDriverFn = async () => {
        await removeDriver(id).then(() => {
            setShowDelete(false)
        })
    }

    return (
        <React.Fragment>
            {showAddTransportRoute ?
            <AddTransportModal
                isOpen={showAddTransportRoute}
                closeModal={()=> setShowAddTransportRoute(false)}
            />
            :
            null
            }
            {showDelete ?
            <DeleteModal
                isOpen={showDelete}
                closeModal={()=> setShowDelete(false)}
                deleteTitle={deleteTitle}
                deleteText={deleteText}
                deleteAction={() => {
                    if (deleteType === 'transport-route') {
                        deleteRouteFn()
                    } else {
                        removeDriverFn()
                    }
                }} 
                deleteLoading={removeRouteLoading || removeDriverLoading}
                buttonText={deleteButtonText}
            />
            :
            null
            }
            showAddTransportRoute
            {showAddStudent ?
            <AddStudentToTransportRouteModal
                student={null}
                type={'add'}
                isOpen={showAddStudent}
                closeModal={()=> setShowAddStudent(false)}
            />
            :
            null
            }

            {showAssignDriverToRoute ?
            <AssignDriverToRouteModal
                isOpen={showAssignDriverToRoute}
                closeModal={()=> setShowAssignDriverToRoute(false)}
            />
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View driver'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {transportRouteLoading ?
                    <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={transportRouteLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <React.Fragment>
                        <div className='flex justify-between items-center w-full h-[60px] bg-background rounded'>
                            <div className='px-4'>
                                {transportRoute?.class_name}
                            </div>
                            <div className='flex gap-4 items-center'>
                                <div 
                                    className='flex gap-2 text-[13px] text-red-500 items-center cursor-pointer hover:underline duration-300'
                                    onClick={() => {
                                        setDeleteTitle('Delete Route Information')
                                        setDeleteText(`Are you sure you want to delete this transportation route from your school?`)
                                        setDeleteType('transportation-route')
                                        setDeleteButtonText('Delete Transport Route')
                                        setShowDelete(true)
                                    }}
                                >Remove Transport Route <TrashCan /></div>
                                <AppButton
                                    type="button" 
                                    kind={'primary'} 
                                    renderIcon={Edit}
                                    action={() => {
                                        setType('edit')
                                        setShowAddTransportRoute(true)
                                    }}
                                    // loading={isLoading}
                                    text={'Edit Transport Route'}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col justify-between items-center w-full h-fit bg-background rounded'>
                            <div className='flex flex-col px-4 h-[86px] w-full justify-center gap-1'>
                                <div className='text-[18px]'>
                                    Manage Transport Route Driver
                                </div>
                                <div className='text-[11px] font-light'>
                                    Driver is responsible for taking students to and from their homes to school.
                                </div>
                            </div>

                            <div className='flex items-center min-h-[48px] justify-start min-w-full bg-white'>
                                {transportRoute?.driver_id && transportRoute?.driver?
                                <div className='flex md:flex-row flex-col md:items-center px-4 bg-white gap-1 py-3 w-full  md:min-h-[136px] md:max-h-[136px] '>
                                    <div className='flex items-center md:w-1/2 w-full md:gap-0 gap-3'>
                                        <div className='w-1/4'>
                                            {transportRoute?.driver?.profile_photo_url ?
                                            <div className='flex items-center justify-center h-[96px] w-[96px] !bg-background text-[12px] gap-2'>
                                                <img src={transportRoute?.driver?.profile_photo_url} alt='profileImage' />
                                            </div>
                                            :
                                            <div className='flex items-center justify-center h-[96px] w-[96px] !bg-background'>
                                                <img src={profilePix} alt='profileImage' />
                                            </div>
                                            }
                                        </div>
                                        <div className='flex flex-col gap-2 md:w-3/4'>
                                            <span className='font-semibold text-[15px]'>
                                                {transportRoute?.driver.first_name} {transportRoute?.driver.last_name}
                                            </span>
                                            <span className='font-normal text-[13px]'>
                                                {transportRoute?.driver.email}
                                            </span>
                                            <span className='font-normal text-[13px]'>
                                                {transportRoute?.driver.mobile}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 md:w-1/2 w-full justify-end items-center'>
                                        <div 
                                            className='flex gap-2 text-[13px] text-red-500 items-center cursor-pointer hover:underline duration-300'
                                            onClick={() => {
                                                setDeleteTitle('Remove Teacher From Class')
                                                setDeleteText(`Are you sure you want to remove ${transportRoute?.driver.first_name} from this class?`)
                                                setDeleteType('driver')
                                                setDeleteButtonText('Remove Teacher')
                                                setShowDelete(true)
                                            }}
                                        >
                                            Remove Route Driver <TrashCan />
                                        </div>
                                        <AppButton
                                            type="button" 
                                            kind={'primary'} 
                                            renderIcon={Edit}
                                            className={'!h-[42px]'}
                                            action={() => {
                                                setDriverId(transportRoute?.driver_id)
                                                setShowAssignDriverToRoute(true)
                                            }}
                                            // loading={isLoading}
                                            text={'Change Assigned Driver '}
                                        />
                                    </div>
                                </div>
                                :
                                <React.Fragment>
                                    <div className='flex gap-2 text-[14px] items-center w-[100%] bg-red-500 h-[48px] text-white px-4'>No route driver</div>
                                    <div className='flex justify-end'>
                                        <AppButton
                                            type="button" 
                                            kind={'primary'} 
                                            action={() => {
                                                setShowAssignDriverToRoute(true)
                                            }}
                                            text={'Assign driver to Route'}
                                        />
                                    </div>
                                </React.Fragment>}
                            </div>
                        </div>
                    </React.Fragment>
                    }
                    <TabView 
                        componentTabs={tabs}
                    />
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewTransportPage;