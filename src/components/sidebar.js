import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar, IsTurnRightPanelOff } from '../redux/components/components-slice';
import { SideNav, SideNavItems, SideNavLink, SideNavMenu } from 'carbon-components-react';
import { 
  Dashboard, 
  Education,
  GroupPresentation, 
  ManageProtection, 
  Person, 
  UserMultiple, 
  Book, 
  Collaborate, 
  CalendarTools, 
  Wallet, 
  CalendarHeatMap,
  IbmWatsonMachineLearning
} from '@carbon/icons-react';

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

  const sideBar =  [
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
      name: 'Attendance Register',
      id: 'student-attendance',
      icon: CalendarHeatMap,
      route: '/student-attendance',
    },
    {
      name: 'E-Learning',
      id: 'e-learning',
      icon: IbmWatsonMachineLearning,
      route: '/e-learning',
    },
    {
      name: 'Administration',
      id: 'administration',
      icon: ManageProtection,
      route: null,
      paths: ['sessions', 'student-records', 'admission'],
      subroute: [
        {
          name: 'Non-Teaching Staff',
          id: 'non-academic-staff',
          icon: UserMultiple,
          route: '/non-academic-staff',
        },
        {
          name: 'Fees Management',
          id: 'fees-management',
          icon: Wallet,
          route: '/fees-management',
        },
        {
          name: 'Sessions',
          id: 'sessions',
          icon: Collaborate,
          route: '/sessions',
        },
        {
          name: 'Time Table',
          id: 'time-table',
          icon: CalendarTools,
          route: '/time-table',
        },
        {
          name: 'Admissions',
          id: 'admission',
          icon: Education,
          route: '/admissions',
        },
        // {
        //   name: 'Transportation Settings',
        //   id: 'transportation',
        //   icon: Book,
        //   route: '/transportation',
        // },
        {
          name: 'Exams/Result Settings',
          id: 'exam-result-settings',
          icon: Book,
          route: '/exam-result-settings',
        },
        
      ]
    },
  ]

  return (
    <SideNav expanded={isSidebarOpen} isChildOfHeader={true} aria-label="Side navigation"  className='bg-background !backdrop-blur-sm bg-black/30'>
      <SideNavItems className='bg-background'>
        <>
          {sideBar?.map((item, index) => (
            <div id={item.id} key={index}>
              {item.subroute && item.subroute.length > 0?
              <SideNavMenu 
                className='outline-none !text-[12px]'
                large
                title={item.name}
                renderIcon={item.icon}
                isActive={item.paths?.includes(location?.pathname.split('/')[1])}
              >
                {item.subroute?.map((subItem, subIndex) => (
                <SideNavLink 
                  key={subIndex}
                  isActive={location.pathname.split('/')[1] === (subItem.route).split('/')[1] ? true : false}
                  className='cursor-pointer -ml-[35px] !text-[12px]'
                  element={Link} 
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
                  {subItem.name}
                </SideNavLink>
                ))}
                </SideNavMenu>
              :
              <SideNavLink 
                key={index}
                isActive={location.pathname.split('/')[1] === (item.route).split('/')[1] ? true : false}
                className='cursor-pointer !text-[12px]'
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
