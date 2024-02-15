/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useGetStudent } from '../../../../redux/students/hook';
import TabView from '../../../../components/tabs';
import ViewProfile from '../../../../components/view-profile';
import Children from './children';
import SchoolFees from './fees';
import ParentMessages from './messages';

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
      ];

    const {id} = useParams();
    const { data: parents, isLoading: parentLoading } = useGetStudent(id);

    return (
        <React.Fragment>
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
                        firstName={'Adedokun'} 
                        lastName={'Agunbiade'} 
                        email={'adedokun@schoolar.com'} 
                        mobile={'+2348106668220'} 
                        deleteText={'Delete parent'}
                        deleteFunction={''} 
                        editText={'Edit parent'} 
                        editFunction={''} 
                        route='Parents/guardians' 
                        routeLink='/parents-guardians'
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