import React, { useState } from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PAGINATION_DEFAULT, sessionStatusConfig } from '../../../../../utils';
import AppDataTable from '../../../../../components/dataTable';
import AddTermModal from './sub-components/modals/add-term';
import { useGetSession} from '../../../../../redux/administration/sessions/hook';
import { useGetTerms } from '../../../../../redux/administration/sessions/terms/hook';


const AcademicTermsPage = () => {

    const {id} = useParams();
    const { data: session } = useGetSession(id);

    const [pagination, setPagination] = useState({
        limit: PAGINATION_DEFAULT.limit,
        page: PAGINATION_DEFAULT.page,
        statusFilter: PAGINATION_DEFAULT.statusFilter,
        search: '',
    });

    const { data: terms, isLoading: sessionLoading } = useGetTerms(
        pagination.limit,
        pagination.page,
        pagination.statusFilter,
        pagination.search,
    );

    const [showAddTerm, setShowAddTerm] = useState(false);

    const tableConfig = [
        {
            key: 'uuid',
            header: 'id',
        },
        {
            key: 'name',
            header: 'Term Name',
        },
        {
            key: 'start_date',
            header: 'Start Date',
        },
        {
            key: 'end_date',
            header: 'End Date',
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
                key: 'uuid',
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
                key: 'parents',
                header: 'Primary Guardian',
            },
            {
                key: 'status',
                header: 'Status',
            },
        ]
    };

    return (
        <>
        {showAddTerm ?
        <AddTermModal
            term={null}
            type={'add'}
            isOpen={showAddTerm}
            closeModal={()=> setShowAddTerm(false)}
        />
        :
        null
        }
        <DashboardLayout>
            <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                <Link to={'/sessions'} className='hover:underline duration-300 text-[15px]'>
                    {'Sessions'}
                </Link>
                {session?
                <Link to={`/sessions/${session?.uuid}`} className='hover:underline duration-300 text-[15px]'>
                    / {session?.name}
                </Link> 
                :
                null
                }
                <span className='text-[14px]'>
                    / {'Terms'}
                </span>
            </div>
            <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>
                
                <AppDataTable
                    title={'Terms'}
                    description={'Manage academic terms for this session'}
                    tableHeader={tableConfig}
                    pagination={pagination}
                    setPagination={setPagination}
                    mobileTableHeader={mobileTableHeader}
                    data={terms}
                    mainButtonText='Create Term'
                    mainButtonAction={() => {
                        setShowAddTerm(true)
                    }}
                    emptyText={'No session added'}
                    emptySubText={'Please add terms to this academic session by clicking the button below'}
                    viewActionType={'session'}
                    statusConfig={sessionStatusConfig}
                    loading={sessionLoading}
                    addMultiple={false}
                />
            </div>
        </DashboardLayout>
        </>
    );
};

export default AcademicTermsPage;