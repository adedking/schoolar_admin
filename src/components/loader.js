import React from 'react';
import { Loading } from 'carbon-components-react';
import DashboardLayout from './layouts/dashboard';

const SuspenseLoader = () => {

    return (
        <DashboardLayout>
        <div className='flex flex-col min-h-[600px] w-full justify-center items-center gap-8'>
            <span className='font-semibold text-[30px] animate-pulse duration-300'>Pluraled</span>
            <Loading className={''} withOverlay={false} small={true} />
        </div>
        </DashboardLayout>
    )
};

export default SuspenseLoader;