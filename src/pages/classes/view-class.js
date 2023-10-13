/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import AppDataTable from '../../components/dataTable';
import { PAGINATION_DEFAULT } from '../../utils';
import { useGetClass } from '../../redux/classes/hook';
import { useParams } from 'react-router-dom';
import AppButton from '../../components/app-button';
import { ArrowRight, Edit, TrashCan, UserMultiple } from '@carbon/icons-react';
import { Loading } from '@carbon/react';

const ViewClassPage = () => {
    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const {id} = useParams();
    const { data: classInfo, isLoading: classLoading } = useGetClass(id);

    console.log(classInfo)
    const [showAddTeacher, setShowAddTeacher] = useState(false);
    const data = {
        data: [
        {
            id: '1',
            first_name: 'Adedokun',
            last_name: 'Agunbiade',
            full_name: 'Adedokun Agunbiade',
            email: 'adedokun@schoolar.com',
            phone_number: '08106668220',
            teaching_class: 'SS2, SS3',
            teaching_subject: 'Mathematics',
            status: 'Active',
        },
        {
            id: '2',
            first_name: 'Oladotun',
            last_name: 'Aboaba',
            full_name: 'Oladotun Aboaba',
            email: 'dotun@schoolar.com',
            phone_number: '08106668220',
            teaching_class: 'SS2, SS3',
            teaching_subject: 'Mathematics',
            status: 'Active',
        },
        {
            id: '3',
            first_name: 'Omotolani',
            last_name: 'Olurotimi',
            full_name: 'Omotolani Olurotimi',
            email: 'tola@schoolar.com',
            phone_number: '08106668220',
            teaching_class: 'SS2, SS3',
            teaching_subject: 'Mathematics',
            status: 'Active',
        },
    ]};

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
            {/* {showAddTeacher ?
            <AddTeacherModal
                isOpen={showAddTeacher}
                closeModal={()=> setShowAddTeacher(false)}
            />
            :
            null
            } */}
            <DashboardLayout viewComponent={null} viewTitle={'View teacher'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {classLoading ?
                    <div className='flex flex-row p-8 px-16 h-[120px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={classLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <React.Fragment>
                    <div className='flex justify-between items-center w-full h-[60px] bg-background rounded'>
                        <div className='px-4'>
                            {classInfo?.name}
                        </div>
                        <div className='flex gap-4 items-center'>
                            <div className='flex gap-2 text-[13px] text-red-500 items-center'>Remove class <TrashCan /></div>
                            <AppButton
                                type="button" 
                                kind={'primary'} 
                                renderIcon={Edit}
                                // action={submitForm}
                                // loading={isLoading}
                                text={'Edit class'}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col justify-between items-center w-full h-fit bg-background rounded'>
                        <div className='flex flex-col px-4 h-[86px] w-full justify-center gap-1'>
                            <div className='text-[18px]'>
                                Manage class teacher
                            </div>
                            <div className='text-[11px] font-light'>
                                Class teacher is responsible for day to day activities of the class
                            </div>
                        </div>

                        <div className='flex items-center min-h-[48px] justify-start w-full bg-white'>
                            {!classInfo?.teacher_id?
                            <div className='flex flex-col px-4 bg-white gap-1 py-3'>
                                <div className='text-[15px]'>Mr Aboaba Oladotun</div>
                                <div className='text-[12px] font-light'>aboabaoladotun@gmail.com</div>
                                <div className='text-[12px] font-light'>080613673000</div>
                                <div className='flex gap-4 items-center mt-2'>
                                    <div className='flex gap-2 text-[13px] text-red-500 items-center'>Remove class teacher <TrashCan /></div>
                                    <AppButton
                                        type="button" 
                                        kind={'primary'} 
                                        renderIcon={UserMultiple}
                                        className={'!h-[42px]'}
                                        // action={submitForm}
                                        // loading={isLoading}
                                        text={'Change teacher'}
                                    />
                                </div>
                            </div>
                            :
                            <React.Fragment>
                                
                                <div className='flex gap-2 text-[14px] items-center w-[100%] bg-red-500 h-[48px] text-white px-4'>No class teacher</div>
                                <div className='flex justify-end'>
                                    <AppButton
                                        type="button" 
                                        kind={'primary'} 
                                        // renderIcon={Edit}
                                        // action={submitForm}
                                        // loading={isLoading}
                                        text={'Assign teacher to class'}
                                    />
                                </div>
                            </React.Fragment>}
                            
                        </div>
                    </div>
                    </React.Fragment>
                    }
                    <div className='min-w-full bg-background rounded-sm'>
                        <AppDataTable
                            title={'Manage class subjects'}
                            description={'Add/remove subjects for the class and assign teachers to respective subjects'}
                            tableHeader={tableConfig}
                            mobileTableHeader={mobileTableHeader}
                            showToolBar={false}
                            // data={teachers}
                            mainButtonText='Add Teacher'
                            mainButtonAction={() => {
                                setShowAddTeacher(true)
                            }}
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
                            mainButtonAction={() => {
                                setShowAddTeacher(true)
                            }}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewClassPage;