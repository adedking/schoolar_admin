import React, { useEffect } from 'react';
import NavBar from '../nav-bar';
import Sidebar from '../sidebar';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from 'carbon-components-react';
import RightView from '../right-panel';

const DashboardLayout = ({children, viewComponent, viewTitle}) => {
    const { user } = useSelector((state) => state.userSlice);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            if (user.email_verified === 0) {
                if (location.pathname !== '/onboarding/verify-otp') {
                navigate('/onboarding/verify-otp');
                }
                return;
            } else {
                if (
                location.pathname === '/' ||  
                location.pathname.split('/')[1] === '/register' || 
                location.pathname.split('/')[1] === '/forgot-password' ||  
                location.pathname.split('/')[1] === '/set-password' ||  
                location.pathname.split('/')[1] === '/reset-password') 
                {
                    navigate('/dashboard');
                }
            }
        } else {
            if (
                location.pathname !== '/' &&  
                location.pathname.split('/')[1] !== 'register' && 
                location.pathname.split('/')[1] !== 'forgot-password' && 
                location.pathname.split('/')[1] !== 'set-password' &&
                location.pathname.split('/')[1] !== 'reset-password' && 
                location.pathname.split('/')[1] === 'onboarding/verify-otp') {
                navigate('/'); 
            } else {
                navigate('/');  
            }
        }
    }, [location, user, navigate])

    const { isSidebarOpen, isRightPanelOpen } = useSelector((state) => state.componentsSlice);

    return (
        <React.Fragment>
            
            <div className='flex flex-col bg-white !max-h-screen !min-h-screen relative overflow-hidden'>
                {isRightPanelOpen?
                <div className='absolute inset-0 left-0 bg-black min-w-full max-w-screen min-h-screen max-h-screen opacity-50 z-50 duration-300'>

                </div>
                :
                null
                }
                
                <Header aria-label="Schoolar" className='flex justify-between w-full px-4'>
                    <NavBar
                        isSidebarOpen={isSidebarOpen}
                        isRightPanelOpen={isRightPanelOpen}
                        profile={true}
                    />
                    <Sidebar isSidebarOpen={isSidebarOpen} />
                </Header>
                <RightView isRightPanelOpen={isRightPanelOpen} children={viewComponent} viewTitle={viewTitle} />
                <div className='flex overflow-auto mt-[50px]'>
                    {/* <Sidebar isSidebarOpen={isSidebarOpen} /> */}
                    <div 
                        className={classNames('flex flex-col mt-2 w-full mr-3 max-w-calc[(100%-266px)] !min-h-fit h-fit duration-300 gap-3 ml-3 z-30 pb-3 overflow-x-auto px-3', {
                            'ml-3':!isSidebarOpen || window.innerWidth <= 600,
                            'ml-[266px]':isSidebarOpen || window.innerWidth >= 1000 ,
                        })}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment>
        
    );
};

export default DashboardLayout;