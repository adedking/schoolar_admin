import React, { useState, useEffect } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from 'reactstrap';
import classnames from 'classnames';
import DropDownSVG from '../assets/svg/chevron-down.svg';
// import { useSelector } from 'react-redux';

const TabView = ({ Tabs, activeTab, setActiveTab }) => {
  // const [activeTab, setActiveTab] = useState(1);
  const [collapse, setCollapse] = useState(false);


  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  useEffect(() => {
    if(activeTab > Tabs.length) {
      setActiveTab(1)
    }
  }, [])

  const toggleCollapse = () => {
    setCollapse(!collapse);
  };

  function switchTab(index) {
    setActiveTab(index);
    toggleCollapse();
  }

  return (
    <React.Fragment>
        <Nav
          tabs
          className='flex justify-between !rounded shadow-sm !flex-nowrap overflow-y-auto'
        >
          {activeTab < Tabs.length + 1 && Tabs.map((item, index) => (
            <NavItem className='flex flex-row justify-center items-center !max-w-[200px] !h-[100%] p-0 cursor-pointer' key={index}>
              <NavLink
                className={classnames(
                  'flex flex-col justify-start items-start tab-view-item !w-full',
                  {
                    'duration-300 border': activeTab === index + 1,
                  },
                )}
                onClick={() => {
                  toggle(index + 1);
                }}
              >
                <div
                  className={classnames(
                    'flex flex-row justify-center items-start tab-view-item !rounded-none min-w-[115px] min-h-fit text-black',
                    {
                    'text-black text-[14px] duration-300 border-b-[4px] pb-[10px] pt-[18px] border-secondary-2 cursor-default font-extrabold': activeTab === index + 1,
                    'text-[12px] text-black hover:text-gray-500 duration-300 pb-[10px] pt-[18px] hover:border-b-[4px] hover:text-[14px] hover:border-gray-300': activeTab !== index + 1,
                  })}
                >
                  {item.title}
                </div>
              </NavLink>
            </NavItem>
          ))}
        </Nav>

      <TabContent activeTab={activeTab} className='mt-[35px]'>
        {activeTab < Tabs.length + 1 && Tabs.map(({ title, Content }, index) => (
          <TabPane tabId={index + 1} key={index}>
            <>
              {activeTab - 1 === index ? (
                <>{Content ? <Content /> : null}</>
              ) : null}
            </>
          </TabPane>
        ))}
      </TabContent>
    </React.Fragment>
  );
};

export default TabView;
