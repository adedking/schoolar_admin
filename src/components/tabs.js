// import { Tab, TableActionList } from 'carbon-components-react';
// import { Tabs, TabList, Tab, TabPanels, TabPanel, IconTab } from 'carbon-components-react';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const TabView = ({ Tabs, activeTab, setActiveTab }) => {
  // const [activeTab, setActiveTab] = useState(1);
  // const [collapse, setCollapse] = useState(false);


  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  useEffect(() => {
    if(activeTab > Tabs.length) {
      setActiveTab(1)
    }
  }, [activeTab, setActiveTab, Tabs])

  return (
    <>
      <div
        className='hidden md:flex tab-view-container select-none'
      >
        <Nav
          tabs
          className='tab-view !rounded shadow-sm !flex-nowrap w-full p-0 overflow-y-hidden'
        >
          {activeTab < Tabs.length + 1 && Tabs.map((item, index) => (
            <NavItem className='flex flex-row justify-center items-center !max-w-[200px] !h-[100%] p-0' key={index}>
              <NavLink
                className={classNames(
                  'flex flex-col justify-start items-start tab-view-item !w-full !rounded-none  p-0',
                  {
                    'duration-300 border-b-2': activeTab === index + 1,
                  },
                )}
                onClick={() => {
                  toggle(index + 1);
                }}
              >
                <div
                  className={classNames(
                    'flex flex-row justify-center items-start tab-view-item !rounded-none min-w-[115px] min-h-[100%]',
                    {
                    'text-secondary-2 text-[13px] duration-300 border-b-[4px] pb-[14px] pt-[18px] border-secondary-2 cursor-default font-extrabold': activeTab === index + 1,
                    'text-[12px] text-color-gray hover:text-gray-500 duration-300 pb-[14px] pt-[18px] hover:border-b-[4px] hover:text-[14px] hover:border-gray-300': activeTab !== index + 1,
                  })}
                >
                  {item.title}
                </div>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>
      <TabContent activeTab={activeTab} className='mt-[15px]'>
        {activeTab < Tabs.length + 1 && Tabs.map(({ title, Content }, index) => (
          <TabPane tabId={index + 1} key={index}>
            <>
              {activeTab - 1 === index ? (
                <>{Content ? Content  : null}</>
              ) : null}
            </>
          </TabPane>
        ))}
      </TabContent>
    </>
  );
};

export default TabView;
