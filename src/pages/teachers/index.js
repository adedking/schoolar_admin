import React from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import { Table, TableHead, TableHeader, TableRow } from 'carbon-components-react';
import AppDataTable from '../../components/dataTable';

const TeachersPage = () => {
    

    const cardData = {
        columns: 2,
        items: [
           { title: 'Teachers', value: 50},
           { title: 'Active', value: 20},
        ]
    }
    return (
        <DashboardLayout>
            <div className='flex flex-col items-center jusify-center min-w-full min-h-full gap-4'>
                <WidgetCard 
                    cardData={cardData}
                />
                <div className='w-full p-3 bg-login-background rounded-sm'>
                    <div>Title</div>
                    <div>Subtitle</div>
                    <AppDataTable />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TeachersPage;