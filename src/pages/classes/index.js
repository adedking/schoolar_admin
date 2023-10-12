import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import AddClassModal from './sub-components/modals/add-class/add-class';
import ClassesDataCard from './classes-data-card';
import { Settings } from '@carbon/icons-react';
import { useDispatch } from 'react-redux';
import { IsTurnRightPanelOn } from '../../redux/components/components-slice';
import ViewClassRank from './sub-components/modals/view-class/view-class-rank';
import { useGetClasses } from '../../redux/classes/hook';

const ClassesPage = () => {
    const [showAddClass, setShowAddClass] = useState(false);

    const dispatch = useDispatch();
    const { data: classes } = useGetClasses(9, 1, -1, '');

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
            key: 'gender',
            header: 'Gender',
        },
        {
            key: 'class',
            header: 'Class',
        },
        {
            key: 'enrolment_id',
            header: 'Enrolment ID',
        },
        {
            key: 'primary_guardian',
            header: 'Primary Guardian',
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
            {showAddClass ?
            <AddClassModal
                isOpen={showAddClass}
                closeModal={()=> setShowAddClass(false)}
            />
            :
            null
            }
            <DashboardLayout viewComponent={<ViewClassRank />} viewTitle={`View teacher`}>
                <div className='flex flex-col items-center jusify-center min-w-full max-w-full min-h-full gap-4 mb-3 mt-2'>
                    <div 
                        className='w-full flex min-h-[40px] justify-between items-center'
                        onClick={() => {
                            handleRightPanelToggle()
                        }}
                    >
                        <div>Class setup</div>
                        <div className='flex gap-3 items-center text-primary text-[14px] cursor-pointer hover:underline hover:scale-105 duration-300 hover:pr-4'>Class management <Settings /></div>
                    </div>
                    <div className='min-w-full max-w-full bg-background rounded-sm'>
                        <ClassesDataCard 
                            title={'All Classes'}
                            tableHeader={tableConfig}
                            mobileTableHeader={mobileTableHeader}
                            data={classes}
                            mainButtonText='Add Class'
                            mainButtonAction={() => {
                                setShowAddClass(true)
                            }}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ClassesPage;