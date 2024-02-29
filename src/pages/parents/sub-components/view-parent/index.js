/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import TabView from '../../../../components/tabs';
import ViewProfile from '../../../../components/view-profile';
import Children from './children';
import SchoolFees from './fees';
import ParentMessages from './messages';
import { useDeleteParent, useGetParent } from '../../../../redux/parents/hook';
import AddParentModal from '../modals/add-parent/add-single-parent/add-parent';

import { useNavigate } from 'react-router-dom';

const ViewParentPage = () => {
    const tabs = [
        {
            title: 'Children/Wards',
            content: <Children  />,
        },
        {
            title: 'Fees History',
            content: <SchoolFees  />
        },
        {
            title: 'Messages',
            content: <ParentMessages />
        },
        {
            title: 'Documents',
            content: <ParentMessages />
        },
    ];

    const {id} = useParams();
    const { data: parent, isLoading: parentLoading } = useGetParent(id);
    const [showEditParent, setShowEditParent] = useState(false);
    const [showDelete, setShowDelete] =useState(false)
    const {mutateAsync: removeParent, isLoading: removeParentLoading} = useDeleteParent()

    const navigate = useNavigate();

    const deleteParentFn = async () => {
        await removeParent(id).then(() => {
            setShowDelete(false)
            navigate('/parents-guardians')
        })
    }

    return (
        <React.Fragment>
            {showEditParent ?
            <AddParentModal
                type={'edit'}
                isOpen={showEditParent}
                closeModal={()=> setShowEditParent(false)}
            />
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View parent'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {parentLoading ?
                    <div className='flex flex-row p-8 px-16 h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={parentLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                    <ViewProfile 
                        profileImage={''} 
                        firstName={parent?.first_name} 
                        lastName={parent?.last_name} 
                        email={parent?.email} 
                        mobile={parent?.mobile} 
                        deleteText={'Delete parent'}
                        deleteFunction={deleteParentFn} 
                        editText={'Edit parent'} 
                        editFunction={() => {
                            setShowEditParent(true)
                        }} 
                        route='Parents/guardians' 
                        routeLink='/parents-guardians'
                        name={`${parent?.title}. ${parent?.first_name} ${parent?.last_name}`}
                    />
                    <TabView 
                        componentTabs={tabs}
                    />
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewParentPage;