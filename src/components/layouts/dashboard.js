import React from 'react';
import NavBar from '../nav-bar';
import Sidebar from '../sidebar';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const DashboardLayout = ({children, justification}) => {
    // useCheckOnboarding()
    const { isSidebarOpen } = useSelector((state) => state.componentsSlice);

    return (
        <div className='flex flex-col bg-white max-w-screen min-w-screen max-h-screen min-h-screen overflow-y-auto relative'>
            <div className='bg-white !border-b-2 !border-gray-400'>
                <NavBar 
                    isSidebarOpen={isSidebarOpen}
                    profile={true}
                />
            </div>
            < div className='flex flex-row'>
                <div
                    className={classNames('lg:flex md:flex h-screen inset-0 absolute top-[48px] duration-300', {
                        'left-0': isSidebarOpen,
                        'left-[-256px]': !isSidebarOpen,
                    })}
                    // style={{ width: sidebarWidth }}
                >
                    <Sidebar />
                </div>
                <div 
                    className={classNames('flex flex-col mt-3 w-full mr-3 duration-300 gap-3', {
                        'ml-3':!isSidebarOpen,
                        'ml-[266px]':isSidebarOpen,
                    })}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;