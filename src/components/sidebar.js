import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar, IsTurnRightPanelOff } from '../redux/components/components-slice';
import { SideNav, SideNavItems, SideNavLink } from 'carbon-components-react';
import { Dashboard, Document, Education, GroupPresentation, ManageProtection, Person, UserFollow, UserMultiple } from '@carbon/icons-react';
import classNames from 'classnames';
import { Collapse } from 'reactstrap';
import CollapsingIcon from './collapsing-icon';

const Sidebar = ({isSidebarOpen}) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSidebarToggle = () => {
    if (window.innerWidth < 600) {
      dispatch(IsTogglingSidebar());
    }
  };

  const handleRightPanelToggle = () => {
    dispatch(IsTurnRightPanelOff());
  };

  const [sideBar, setSideBar] =  useState([
    {
      name: 'Dashboard',
      id: 'dashboard',
      icon: Dashboard,
      route: '/dashboard',
      active: true,
    },
    {
      name: 'Students',
      id: 'students',
      icon: Education,
      route: '/students',
    },
    {
      name: 'Parents/Guardians',
      id: 'parents-guardians',
      icon: Person,
      route: '/parents-guardians',
    },
    {
      name: 'Teachers',
      id: 'teachers',
      icon: UserMultiple,
      route: '/teachers',
      
    },
    {
      name: 'Classes',
      id: 'classes',
      icon: GroupPresentation,
      route: '/classes',
    },
    
    {
      name: 'Administration',
      id: 'administration',
      icon: ManageProtection,
      route: null,
      isOpen: true,
      subroute: [
        {
          name: 'Sessions Management',
          id: 'sessions',
          icon: UserFollow,
          route: '/sessions-management',
        },
        {
          name: 'Student Records',
          id: 'student-records',
          icon: Document,
          route: '/student-records',
        },
        {
          name: 'Admissions',
          id: 'admissions',
          icon: UserFollow,
          route: '/admission',
        },
      ]
    },
  ])

  return (
    <SideNav expanded={isSidebarOpen} isChildOfHeader={true} aria-label="Side navigation"  className='bg-background !backdrop-blur-sm bg-black/30'>
      <SideNavItems className='bg-background'>
        <>
          {sideBar?.map((item, index) => (
            <div id={item.id} key={index}>
              {item.subroute && item.subroute.length > 0?
              <>
                <div
                  className={classNames('flex flew-row gap-8 justify-between text-color-black font-normal text-[13px] leading-[20px] pl-[20px] !h-[35px] items-center hover:font-semibold hover:bg-white hover:bg-opacity-20 cursor-pointer select-none', {
                    'font-extrabold text-[13px] text-color-black bg-white bg-opacity-10 border-l-4 border-l-white ': item.paths?.includes(location?.pathname.split('/')[1]),
                  })}
                  onClick={() => {
                    let newArray = JSON.parse(JSON.stringify(sideBar));
                    newArray[index].isOpen = !item.isOpen;
                    // console.log(newArray)
                    setSideBar(newArray);
                  }}
                >
                  <div 
                    className={classNames('flex text-black duration-300 ', {
                      'font-bold': item.isOpen,
                    })}
                  >
                    <img src={item.icon} alt={item.name} className={'pr-[15px] max-w-[50px] max-h-[50px]'} />
                    {item.name}
                  </div>
                  
                  <div className='pr-4'>
                    <CollapsingIcon defaultPosition='left' isOpen={item.isOpen} />
                  </div>
                </div>
                <div
                  className={classNames('flex flex-col duration-300', {
                    hidden: !item.isOpen,
                  })}
                >
                  {item.isOpen}
                  <Collapse 
                    isOpen={item.isOpen}
                  >
                    <>
                    {item.subroute.map((subItem, subIndex) => (
                      <SideNavLink 
                        isActive={location.pathname.split('/')[1] === (subItem.route).split('/')[1] ? true : false}
                        className='cursor-pointer !ml-[15px]'
                        element={Link} 
                        key={subIndex}
                        to={subItem.route}
                        renderIcon={subItem.icon}
                        large
                        onClick={() => {
                          handleRightPanelToggle()
                          if (window.innerWidth < 800) {
                            handleSidebarToggle()
                          }
                        }}
                      >
                        <img src={subItem.icon} alt={subItem.name} className={'pl-4 pr-[15px] max-w-[50px] max-h-[50px]'} />
                        {subItem.name}
                      </SideNavLink>
                    ))}
                    </>
                  </Collapse>
                </div>
              </>
              :
              <SideNavLink 
                key={index}
                isActive={location.pathname.split('/')[1] === (item.route).split('/')[1] ? true : false}
                className='cursor-pointer'
                element={Link} 
                to={item.route}
                renderIcon={item.icon}
                large
                onClick={() => {
                  handleRightPanelToggle()
                  if (window.innerWidth < 800) {
                    handleSidebarToggle()
                  }
                }}
              >
                {item.name}
              </SideNavLink>
              }
            </div>
          ))}
        </>
      </SideNavItems>
    </SideNav>
  );
};

export default Sidebar;
