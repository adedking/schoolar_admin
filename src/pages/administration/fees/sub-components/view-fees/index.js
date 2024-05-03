/* eslint-disable no-unused-vars */
import React from 'react';
import DashboardLayout from '../../../../../components/layouts/dashboard';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useGetFee } from '../../../../../redux/administration/fees-management/hook';

const ViewFeesPage = () => {

    const {id} = useParams();
    const { data: fee, isLoading: feeLoading } = useGetFee(id);
    return (
        <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex gap-2 min-h-[18px] max-h-[40px] w-full items-center'>
                    <Link to={'/fees-management'} className='hover:underline duration-300 text-[15px]'>
                        {'Fee Management'}
                    </Link>
                    <span className='text-[14px]'>
                        / {'Fee'}
                    </span>
                </div>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {feeLoading ?
                    <div className='flex flex-row p-8 px-16 min-h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={feeLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col px-4 h-[76px] w-full justify-center gap-1 bg-background'>
                            <div className='text-[18px] font-semibold'>
                                School Fees
                            </div>
                            <div className='text-[13px] font-light'>
                                Manage and update school fees
                            </div>
                        </div>
                        <div className='flex flex-col px-4 h-[76px] w-full justify-center gap-1 bg-background'>
                        </div>
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewFeesPage;