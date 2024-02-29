
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "carbon-components-react";

const RightTabView = ({ componentTabs }) => {

  const [className, setClassName] = useState(`md:min-w-fit !text-[14px] !h-[40px]`)
  useEffect(() => {
    if (componentTabs && componentTabs.length > 0) {
      if (componentTabs.length === 1) {
        setClassName(`md:w-[300px] !text-[14px] !h-[40px]`)
      } else if (componentTabs.length === 2) {
        setClassName(`md:w-fit !text-[14px] !h-[40px]`)
      } else {
        setClassName(`md:w-fit !text-[14px] !h-[40px]`)
      }
    }
  }, [componentTabs])

  return (
        <Tabs
          className='!min-w-[100%]'
        >
          <TabList 
            aria-label="List of tabs"
            fullWidth
            activation="manual"
            className='flex justify-between !min-w-full'
          >
            {componentTabs?.map((item, index) => (
              <Tab key={index} renderIcon={item.icon} className={className} >
                {item.title} 
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {componentTabs?.map((item, index) => (
              <TabPanel key={index}>
                {item.content}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
  );
};

export default RightTabView;
