import React from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';

const SessionTimeTablePage = () => {
    return (
        <>
            <DashboardLayout>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    <div className='flex flex-col px-4 h-[76px] w-full justify-center gap-1 bg-background'>
                        <div className='text-[18px] font-semibold'>
                            Session Time-table Configuration
                        </div>
                        <div className='text-[13px] font-light'>
                            Manage this sessions time-table for both lectures and exams
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 min-w-full max-w-full bg-background rounded-sm'>
                        {/* <AppDataTable
                            title={'Time Table'}
                            description={'Manage session time-table'}
                            tableHeader={tableConfig}
                            pagination={pagination}
                            setPagination={setPagination}
                            mobileTableHeader={mobileTableHeader}
                            data={admissions}
                            mainButtonText='Add Time-Table'
                            mainButtonAction={() => {
                                setShowAddAdmission(true)
                            }}
                            emptyText={'No time table added'}
                            emptySubText={'Please add time table by clicking the button below'}
                            viewActionType={'time-table'}
                            statusConfig={sessionStatusConfig}
                            loading={admissionsLoading}
                            addMultiple={false}
                        /> */}
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default SessionTimeTablePage;