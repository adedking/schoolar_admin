import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar } from '../redux/components/components-slice';
import { Calendar, Close, Help, Menu, UserAvatar } from '@carbon/icons-react';
import { Header, HeaderName } from 'carbon-components-react';

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
      <Header aria-label="Schoolar" className='flex justify-between w-full px-4'>
        <div 
          className='flex justify-start items-center cursor-pointer'
          >
          {toggle?
          <React.Fragment>
            {isSidebarOpen ? 
            <div
              onClick={() => {
                handleSidebarToggle()
              }}
            >
              <Close width={20} height={25} />  
            </div>
            : !isSidebarOpen && window.innerWidth < 600 ? 
            <div
              onClick={() => {
                handleSidebarToggle()
              }}
            >
              <Menu width={20} height={25} />  
            </div>
            : 
            <div
              onClick={() => {
                handleSidebarToggle()
              }}
            >
              <Close width={20} height={25} />  
            </div> 
            }
          </React.Fragment>
          :
          null
          }
          <HeaderName href="#" prefix={''}>
            Schoolar
          </HeaderName>
        </div>
        
        {profile?
        <div className='flex justify-end items-center gap-4'>
          <Calendar width={20} height={20} />
          <Help width={20} height={20} />
          <UserAvatar width={20} height={20} />
        </div>
        :
        null
        } 
      </Header>
    );
};

export default NavBar;