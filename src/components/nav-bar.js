import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar } from '../redux/components/components-slice';
import { Calendar, Help, UserAvatar } from '@carbon/icons-react';
import { HeaderMenuButton, HeaderName } from 'carbon-components-react';

const NavBar = ({profile=false, isSidebarOpen, toggle=true}) => {
  // const [profileOpen, setProfileOpen] = useState(false)
  // const align = document?.dir === 'rtl' ? 'bottom-left' : 'bottom-right';
  const dispatch = useDispatch();
  const handleSidebarToggle = () => {
    dispatch(IsTogglingSidebar());
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && isSidebarOpen === true ) {
        handleSidebarToggle()
      } else if (window.innerWidth > 600 && isSidebarOpen === false) {
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
        <div className='flex justify-end items-center gap-4'>
          <Calendar width={20} height={20} />
          <Help width={20} height={20} />
          <UserAvatar width={20} height={20} />
        </div>
        :
        null
        } 
      </React.Fragment>
    );
};

export default NavBar;