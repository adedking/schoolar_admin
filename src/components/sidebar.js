import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar } from '../redux/components/components-slice';
import { SideNav, SideNavItems, SideNavLink, SideNavMenu, SideNavMenuItem } from 'carbon-components-react';
import { Dashboard, Document, Education, ManageProtection, Person, UserFollow, UserMultiple } from '@carbon/icons-react';

const Sidebar = ({isSidebarOpen}) => {

  const dispatch = useDispatch();
  const location = useLocation();
  const handleSidebarToggle = () => {
    if (window.innerWidth < 600) {
      dispatch(IsTogglingSidebar());
    }
  };

  const sideBar = [
    {
      name: 'Dashboard',
      id: 'dashboard',
      has_sub: false,
      icon: Dashboard,
      route: '/dashboard',
      active: true,
    },
    {
      name: 'Teachers',
      id: 'teachers',
      has_sub: false,
      icon: UserMultiple,
      route: '/teachers',
      
    },
    {
      name: 'Academics',
      id: 'students',
      has_sub: true,
      icon: Education,
      sub_route: [
        {
          name: 'Students',
          id: 'students',
          route: '/students',
        },
        {
          name: 'Classes',
          id: 'classes',
          route: '/classes',
        },
      ]
    },
    {
      name: 'Parents/Guardians',
      id: 'parents-guardians',
      icon: Person,
      has_sub: false,
      route: '/parents-guardians',
    },
    {
      name: 'Student Records',
      id: 'student-records',
      icon: Document,
      has_sub: false,
      route: '/student-records',
    },
    {
      name: 'Admissions',
      id: 'admissions',
      icon: UserFollow,
      route: '/admissions',
    },
    {
      name: 'Administration',
      id: 'administration',
      icon: ManageProtection,
      route: '/administration',
    },
  ]

  return (
    <SideNav  expanded={isSidebarOpen} isChildOfHeader={true} aria-label="Side navigation">
      <SideNavItems className='bg-login-background'>
        {sideBar?.map((item, index) =>
          <React.Fragment key={index}>
            {item.has_sub?
            <SideNavMenu 
              large
              className='!cursor-pointer'
              renderIcon={item.icon} 
              title={item.name}
              isActive={false}>
              {item.sub_route?.map((subItem, subIndex) => (
                <SideNavMenuItem 
                  key={subIndex}
                  element={Link} 
                  to={subItem.route}
                  className='-ml-4 cursor-pointer'
                  large
                  onClick={() => {
                    if (window.innerWidth < 600) {
                      handleSidebarToggle()
                    }
                  }}
                >
                  {subItem.name}
                </SideNavMenuItem>
              ))}
            </SideNavMenu>
            :
            <SideNavLink 
              isActive={location.pathname.split('/')[1] === (item.route).split('/')[1] ? true : false}
              className='cursor-pointer'
              element={Link} to={item.route}
              renderIcon={item.icon}
              large
              onClick={() => {
                if (window.innerWidth < 600) {
                  handleSidebarToggle()
                }
              }}
            >
              {item.name}
            </SideNavLink>
            }
          </React.Fragment>
        )}
      </SideNavItems>
    </SideNav>
  );
};

export default Sidebar;
