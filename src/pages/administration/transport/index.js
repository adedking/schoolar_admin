import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import { PAGINATION_DEFAULT, transportRouteStatusConfig } from '../../../utils';
import AppDataTable from '../../../components/data-table';
import WidgetCard from '../../../components/widget';
import AddTransportModal from './sub-components/modals/add-transport-route';
import { useGetTransportationRoutes } from '../../../redux/administration/transportation/hook';

const TransportationRoutesPage = () => {
    const cardData = {
        columns: 3,
        items: [
           { title: 'Active Routes', value: 50},
           { title: 'Inactive Routes', value: 20},
        ]
    }
    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: transportRoutes, isLoading: transportRoutesLoading } = useGetTransportationRoutes(
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const [showAddTransportRoute, setShowAddTransportRoute] = useState(false);

    const tableConfig = [
        {
            key: 'uuid',
            header: 'id',
        },
        {
            key: 'vehicle_name',
            header: 'Vehicle Name',
        },
        {
            key: 'vehicle_model',
            header: 'Vehicle Model',
        },
        {
            key: 'driver_name',
            header: 'Driver Name',
        },
        {
            key: 'route_start',
            header: 'Route Start',
        },
        {
            key: 'route_end',
            header: 'Route End',
        },
        {
            key: 'student_count',
            header: 'Student Count',
        },
        {
            key: 'status',
            header: 'Status',
        },
    ];

    const mobileTableHeader = {
        main:[
            {
                key: 'uuid',
                header: 'id',
            },
            {
                key: 'name',
                header: 'Book Name',
            },
            {
                key: 'subject',
                header: 'Subject',
            },
        ],
        full: [
            {
                key: 'uuid',
                header: 'id',
            },
            {
                key: 'name',
                header: 'Book Name',
            },
            {
                key: 'author',
                header: 'Author',
            },
            {
                key: 'subject',
                header: 'Subject',
            },
            {
                key: 'class',
                header: 'Class',
            },
            {
                key: 'year_published',
                header: 'Year Published',
            },
            {
                key: 'status',
                header: 'Status',
            },
        ]
    };

    return (
        <>
            {showAddTransportRoute ?
            <AddTransportModal
                term={null}
                type={'add'}
                isOpen={showAddTransportRoute}
                closeModal={()=> setShowAddTransportRoute(false)}
            />
            :
            null
            }
            <DashboardLayout>
                <WidgetCard
                    cardData={cardData}
                />
                <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>   
                    <AppDataTable
                        title={'Transportation Routes'}
                        description={'Manage school transport routes'}
                        tableHeader={tableConfig}
                        pagination={pagination}
                        setPagination={setPagination}
                        mobileTableHeader={mobileTableHeader}
                        data={transportRoutes}
                        mainButtonText='Add Transportation Route'
                        mainButtonAction={() => {
                            setShowAddTransportRoute(true)
                        }}
                        emptyText={'No transportation route added'}
                        emptySubText={'Please add a transportation route by clicking the button below'}
                        viewActionType={'transportation'}
                        statusConfig={transportRouteStatusConfig}
                        loading={transportRoutesLoading}
                        addMultiple={false}
                    />
                </div>
            </DashboardLayout>
        </>
    );
};

export default TransportationRoutesPage;