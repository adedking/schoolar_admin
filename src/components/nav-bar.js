import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar } from '../redux/components/components-slice';
import { Calendar, Help, UserAvatar } from '@carbon/icons-react';
import { HeaderGlobalAction, HeaderGlobalBar, HeaderMenuButton, HeaderName, OverflowMenu } from 'carbon-components-react';
import { OverflowMenuItem } from '@carbon/react';
import { logout } from '../redux/user/hook';

const NavBar = ({profile=false, isSidebarOpen, toggle=true}) => {
  const dispatch = useDispatch();

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
        Schoolar
      </HeaderName>
      {profile?
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Calendar" onClick={() => {}}>
          <Calendar width={20} height={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Help" onClick={() => {}}>
          <Help width={20} height={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label="Profile">
          <OverflowMenu renderIcon={UserAvatar} flipped size={'md'} iconClass='scale-125' className='!bg-white '>
            <OverflowMenuItem 
              itemText="My Profile" 
              className=' !bg-white' 
            />
            <OverflowMenuItem 
              itemText="Log out"  
              className='!text-red-500 !bg-white'
              onClick={() => {
                logout()
              }} 
            />
          </OverflowMenu>
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      :
      null
      } 
    </React.Fragment>
  );
};

export default NavBar;