/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/dashboard';
import { useParams } from 'react-router-dom';
import { Loading } from '@carbon/react';
import { useDeleteParent, useGetParent } from '../../../../redux/parents/hook';
import AddParentModal from '../modals/add-parent/add-single-parent/add-parent';

import { useNavigate } from 'react-router-dom';

const ViewattendancePage = () => {
    const {id} = useParams();
    const { data: parent, isLoading: parentLoading } = useGetParent(id);
    const [showEditParent, setShowEditParent] = useState(false);

    return (
        <React.Fragment>
            {showEditParent ?
            <AddParentModal
                type={'edit'}
                isOpen={showEditParent}
                closeModal={()=> setShowEditParent(false)}
            />
            :
            null
            }
            <DashboardLayout viewComponent={null} viewTitle={'View parent'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                    {parentLoading ?
                    <div className='flex flex-row p-8 px-16 h-[530px] min-w-full bg-background gap-4 justify-center items-center'>
                        <Loading active={parentLoading} className={''} withOverlay={false} small={false} />
                    </div>
                    :
                    <div className='w-full flex flex-col'>
                    </div>
                    }
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ViewattendancePage;