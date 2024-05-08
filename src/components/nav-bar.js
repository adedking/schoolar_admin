import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar } from '../redux/components/components-slice';
import { Calendar, Help, UserAvatar } from '@carbon/icons-react';
import { HeaderGlobalAction, HeaderGlobalBar, HeaderMenuButton, HeaderName, OverflowMenu } from 'carbon-components-react';
import { OverflowMenuItem } from '@carbon/react';
import { logout } from '../redux/user/hook';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NavBar = ({profile=false, isSidebarOpen, toggle=true, loggedIn=false}) => {
  const dispatch = useDispatch();
  const { school, currentSession } = useSelector((state) => state.schoolsSlice);
  const navigate = useNavigate()

  const handleSidebarToggle = () => {
    dispatch(IsTogglingSidebar());
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800 && isSidebarOpen === true ) {
        handleSidebarToggle()
      } else if (window.innerWidth > 800 && isSidebarOpen === false) {
        handleSidebarToggle()
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen])

  return (
    <React.Fragment>
      {toggle?
      <HeaderMenuButton aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'} onClick={handleSidebarToggle} isActive={isSidebarOpen} aria-expanded={isSidebarOpen} />
      : null}
      <HeaderName href="#" prefix={''}>
        Pluraled
      </HeaderName>
      <HeaderGlobalBar>
        {profile ?
        <>
          <HeaderGlobalAction aria-label="Calendar" onClick={() => {}}>
            <Calendar width={20} height={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Session" 
            onClick={() => {
              if (currentSession) {
                navigate(`/sessions/${currentSession?.uuid}`)
              } else {
                navigate(`/sessions`)
              }
              
            }} 
            className='md:flex hidden md:min-w-[190px] w-0 pr-2 '
            >
            <div className='md:flex flex-col hidden'>
              <span className='text-black min-w-fit text-[10px] font-semibold'>{school?.name} - {currentSession?.session_name ? currentSession?.session_name : 'No session'}</span>
              <span className='text-[#29CC39] min-w-fit text-[9px] font-semibold'>Ongoing</span>
            </div>
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Help" onClick={() => {}}>
            <Help width={20} height={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Profile">
            <OverflowMenu renderIcon={UserAvatar} flipped size={'md'} iconClass='scale-125' className='!bg-white'>
              <OverflowMenuItem 
                itemText="New Location"
                className=' !bg-white hover:font-semibold duration-300'
              />
              <OverflowMenuItem 
                itemText="My Profile" 
                className=' !bg-white hover:font-semibold duration-300' 
              />
              <OverflowMenuItem 
                itemText="Log out"  
                className='!text-red-500 !bg-white hover:font-semibold duration-300'
                onClick={() => {
                  logout()
                }} 
              />
            </OverflowMenu>
          </HeaderGlobalAction>
        </>
        : !profile && loggedIn ?
        <HeaderGlobalAction aria-label="Profile">
          <OverflowMenu renderIcon={UserAvatar} flipped size={'md'} iconClass='scale-125' className='!bg-white '>
            <OverflowMenuItem 
              itemText="Log out"  
              className='!text-red-500 !bg-white'
              onClick={() => {
                logout()
              }} 
            />
          </OverflowMenu>
        </HeaderGlobalAction>
        :
        null
        }
        
      </HeaderGlobalBar>
    </React.Fragment>
  );
};

export default NavBar;