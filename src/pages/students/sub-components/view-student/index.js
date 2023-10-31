/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import AppDataTable from '../../../../components/dataTable';
import { PAGINATION_DEFAULT } from '../../../../utils';
import { useGetClass } from '../../../../redux/classes/hook';
import { useParams } from 'react-router-dom';
import AppButton from '../../../../components/app-button';
import { Edit, Settings, TrashCan, UserMultiple } from '@carbon/icons-react';
import { Loading } from '@carbon/react';
import { Pen } from '@carbon/icons-react';
import { useDispatch } from 'react-redux';
import { IsTurnRightPanelOn } from '../../../../redux/components/components-slice';
import { useGetStudent } from '../../../../redux/students/hook';
import StudentBasicInfo from './view-basic-info';
import StudentGuardian from './student-guardians';
import HealthDetails from './health-details';
import TabView from '../../../../components/tabs';
import ViewProfile from '../../../../components/view-profile';

const ViewStudentPage = () => {
    const tabs = [
        {
          title: 'Basic Information',
          content: <StudentBasicInfo  />,
        },
        {
          title: 'Guardians',
          content: <StudentGuardian  />
        },
        {
          title: 'Health Details',
          content: <HealthDetails />
        },
      ];
    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const dispatch = useDispatch();

    const {id} = useParams();
    const { data: student, isLoading: studentLoading } = useGetStudent(id);

    const handleRightPanelToggle = () => {
        dispatch(IsTurnRightPanelOn());
    };

    const tableConfig = [
        {
            key: 'first_name',
            header: 'First Name',
        },
        {
            key: 'last_name',
            header: 'Last Name',
        },
        {
            key: 'email',
            header: 'Email',
        },
        {
            key: 'phone_number',
            header: 'Phone Number',
        },
        {
            key: 'teaching_subject',
            header: 'Teaching Subject',
        },
        {
            key: 'teaching_class',
            header: 'Teaching Class',
        },
        {
            key: 'status',
            header: 'Status',
        },
    ];

    const mobileTableHeader = {
        main:[
            {
                key: 'full_name',
                header: 'Student Name',
            },
            {
                key: 'email',
                header: 'Email',
            },
        ],
        full: [
            {
                key: 'first_name',
                header: 'First Name',
            },
            {
                key: 'last_name',
                header: 'Last Name',
            },
            {
                key: 'email',
                header: 'Email',
            },
            {
                key: 'phone_number',
                header: 'Phone Number',
            },
            {
                key: 'teaching_subject',
                header: 'Teaching Subject',
            },
            {
                key: 'teaching_class',
                header: 'Teaching Class',
            },
            {
                key: 'status',
                header: 'Status',
            },
        ]
    };

    return (
        <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View teacher'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {studentLoading ?
                    <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={studentLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                    <ViewProfile />
                    <TabView componentTabs={tabs}/>
                    
                    </div>
                    }
                    {/* <div className='min-w-full bg-background rounded-sm'>
                        <AppDataTable
                            title={'Manage class subjects'}
                            description={'Add/remove subjects for the class and assign teachers to respective subjects'}
                            tableHeader={tableConfig}
                            mobileTableHeader={mobileTableHeader}
                            showToolBar={false}
                            // data={teachers}
                            mainButtonText='Add subject to class'
                            // mainButtonAction={() => {
                            //     setShowAddTeacher(true)
                            // }}
                        />
                    </div>
                    <div className='min-w-full bg-background rounded-sm'>
                        <AppDataTable
                            title={'Manage students'}
                            description={'Add or remove students for the class'}
                            tableHeader={tableConfig}
                            mobileTableHeader={mobileTableHeader}
                            showToolBar={false}
                            // data={teachers}
                            mainButtonText='Add student to class'
                            // mainButtonAction={() => {
                            //     setShowAddTeacher(true)
                            // }}
                        />
                    </div> */}
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewStudentPage;