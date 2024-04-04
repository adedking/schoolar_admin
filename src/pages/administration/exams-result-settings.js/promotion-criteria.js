import React from 'react';
import { useGetSubClasses } from '../../../redux/classes/hook';
import AppDataTable from '../../../components/data-table';

const PromotionCriteria = () => {

    const { data: subClasses, isLoading: subClassesLoading } = useGetSubClasses();

    const tableConfig = [
        {
            key: 'id',
            header: 'id',
        },
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
            key: 'mobile',
            header: 'Phone Number',
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
                header: "Teacher's Name",
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
        <div className='flex flex-col gap-4 -my-4'>
            <AppDataTable
                title={'Promotion Criteria'}
                description={'Manage promotion criteria per class'}
                tableHeader={tableConfig}
                mobileTableHeader={mobileTableHeader}
                data={subClasses}
                viewActionType={'teacher'}
                loading={subClassesLoading}
            />
        </div>
    );
};

export default PromotionCriteria;