/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import NavBar from '../nav-bar';
import Sidebar from '../sidebar';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from 'carbon-components-react';
import RightView from '../right-panel';
import { IsTogglingRightPanel } from '../../redux/components/components-slice';

const DashboardLayout = ({children, viewComponent, viewTitle}) => {
    const { user } = useSelector((state) => state.userSlice);
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleRightPanelToggle = () => {
        dispatch(IsTogglingRightPanel());
    };
    
    const checkLocation = (type) => {
        let currentLocation = location.pathname.split('/')[1]
        if (type === 'user') {
            if (
                location.pathname === '/' ||
                currentLocation === 'register' ||
                currentLocation === 'forgot-password' ||
                currentLocation === 'set-password' ||
                currentLocation === 'reset-password' ||
                location.pathname === '/onboarding/verify-otp'
                ) {
                navigate('/dashboard');
            }
        } else {
            if (
                location.pathname !== '/' &&
                currentLocation !== 'register' &&
                currentLocation !== 'forgot-password' &&
                currentLocation !== 'set-password' &&
                currentLocation !== 'reset-password'
                ) {
                navigate('/'); 
            }
        }
    }

    useEffect(() => {
        if (user) {
            if (user.email_verified === 0) {
                if (location.pathname !== '/onboarding/verify-otp') {
                    navigate('/onboarding/verify-otp');
                }
                return;
            } else {
                checkLocation('user')
            }
        } else {
            checkLocation('nouser')
        }
    }, [location, user, navigate])

    const { isSidebarOpen, isRightPanelOpen } = useSelector((state) => state.componentsSlice);

    return (
        <React.Fragment>
            {isRightPanelOpen ?
            <div 
                className='absolute inset-0 left-0 backdrop-blur-sm bg-black/30 min-w-full max-w-screen min-h-screen max-h-screen !z-50 !duration-300'
                onClick={() => handleRightPanelToggle()}
            >

            </div>
            :
            null
            }
            <div className='flex flex-col bg-white !max-h-screen !min-h-screen relative overflow-hidden'>
                <Header aria-label="Schoolar" className='flex justify-between w-full px-4 !z-40'>
                    <NavBar
                        isSidebarOpen={isSidebarOpen}
                        isRightPanelOpen={isRightPanelOpen}
                        profile={true}
                    />
                    <Sidebar isSidebarOpen={isSidebarOpen} />
                </Header>
                <RightView isRightPanelOpen={isRightPanelOpen} children={viewComponent} viewTitle={viewTitle} />
                <main className='flex overflow-auto mt-[50px]'>
                    {/* <Sidebar isSidebarOpen={isSidebarOpen} /> */}
                    <div 
                        className={classNames('flex flex-col mt-4 w-full mr-3 max-w-calc[(100%-266px)] !min-h-fit h-fit duration-300 gap-3 ml-3 z-30 pb-3 overflow-x-auto px-3', {
                            'ml-3':!isSidebarOpen || window.innerWidth <= 600,
                            'ml-[266px]':isSidebarOpen || window.innerWidth >= 1000 ,
                        })}
                    >
                        {children}
                    </div>
                </main>
            </div>
        </React.Fragment>
        
    );
};

export default DashboardLayout;