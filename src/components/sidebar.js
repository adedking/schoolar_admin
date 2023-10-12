import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IsTogglingRightPanel, IsTogglingSidebar } from '../redux/components/components-slice';
import { SideNav, SideNavItems, SideNavLink } from 'carbon-components-react';
import { Dashboard, Document, Education, GroupPresentation, ManageProtection, Person, UserFollow, UserMultiple } from '@carbon/icons-react';

const Sidebar = ({isSidebarOpen}) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSidebarToggle = () => {
    if (window.innerWidth < 600) {
      dispatch(IsTogglingSidebar());
    }
  };

  const handleRightPanelToggle = () => {
    dispatch(IsTogglingRightPanel());
  };

  const sideBar = [
    {
      name: 'Dashboard',
      id: 'dashboard',
      icon: Dashboard,
      route: '/dashboard',
      active: true,
    },
    {
      name: 'Teachers',
      id: 'teachers',
      icon: UserMultiple,
      route: '/teachers',
      
    },
    {
      name: 'Students',
      id: 'students',
      icon: Education,
      route: '/students',
    },
    {
      name: 'Classes',
      id: 'classes',
      icon: GroupPresentation,
      route: '/classes',
    },
    {
      name: 'Student Records',
      id: 'student-records',
      icon: Document,
      route: '/student-records',
    },
    {
      name: 'Parents/Guardians',
      id: 'parents-guardians',
      icon: Person,
      route: '/parents-guardians',
    },
    {
      name: 'Admissions',
      id: 'admissions',
      icon: UserFollow,
      route: '/admission',
    },
    {
      name: 'Administration',
      id: 'administration',
      icon: ManageProtection,
      route: '/administration',
    },
  ]

  return (
    <SideNav expanded={isSidebarOpen} isChildOfHeader={true} aria-label="Side navigation">
      <SideNavItems className='bg-background'>
        {sideBar?.map((item, index) =>
          <React.Fragment key={index}>
            <SideNavLink 
              isActive={location.pathname.split('/')[1] === (item.route).split('/')[1] ? true : false}
              className='cursor-pointer'
              element={Link} to={item.route}
              renderIcon={item.icon}
              large
              onClick={() => {
                if (window.innerWidth < 800) {
                  handleSidebarToggle()
                  handleRightPanelToggle()
                }
              }}
            >
              {item.name}
            </SideNavLink>
          </React.Fragment>
        )}
      </SideNavItems>
    </SideNav>
  );
};

export default Sidebar;
