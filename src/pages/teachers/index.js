import React, { useState } from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/dataTable';
import AddTeacherModal from './sub-components/modals/add-teacher';

const TeachersPage = () => {
    

    const cardData = {
        columns: 2,
        items: [
           { title: 'Teachers', value: 50},
           { title: 'Active', value: 20},
        ]
    }
    const [showAddTeacher, setShowAddTeacher] = useState(true);
    const data = {
        data: [
        {
            id: 'a',
            name: 'Load balancer 1',
            status: 'Disabled',
        },
        {
            id: 'b',
            name: 'Load balancer 2',
            status: 'Starting',
        },
        {
            id: 'c',
            name: 'Load balancer 3',
            status: 'Active',
        },
    ]};
    const tableHeader = [
        {
          key: 'name',
          header: 'Name',
        },
        {
          key: 'status',
          header: 'Status',
        },
    ];
    return (
        <DashboardLayout>
            {showAddTeacher ?
            <AddTeacherModal
                isOpen={showAddTeacher}
                closeModal={()=> setShowAddTeacher(false)}
            />
            :
            null
            }
            <div className='flex flex-col items-center jusify-center min-w-full min-h-full gap-4'>
                <WidgetCard 
                    cardData={cardData}
                />
                <div className='min-w-full bg-login-background rounded-sm'>
                    <AppDataTable 
                        title={'List of teachers'}
                        description={'List of all teachers within your school'}
                        tableHeader={tableHeader}
                        data={data}
                        buttonAction={() => {
                            setShowAddTeacher(true)
                        }}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TeachersPage;