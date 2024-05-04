/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import TabView from '../../../components/tabs';
import SchoolTimeTableConfigurationTab from './sub-components/configuration';
import SchoolTimeTableTab from './sub-components/main-time-table';

const SchoolTimeTablePage = () => {
    const tabs = [
        {
            title: 'Configuration',
            content: <SchoolTimeTableConfigurationTab />
        },
        {
            title: 'Time Table',
            content: <SchoolTimeTableTab  />,
        },
    ];
    return (
        <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    <div className='flex flex-col items-center jusify-center w-full gap-4'>
                        <div className='flex flex-col px-4 h-[76px] w-full justify-center gap-1 bg-background'>
                            <div className='text-[18px] font-semibold'>
                                School Time Table
                            </div>
                            <div className='text-[13px] font-light'>
                                Manage school's time-table configurations
                            </div>
                        </div>
                        <TabView componentTabs={tabs}/>
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default SchoolTimeTablePage;