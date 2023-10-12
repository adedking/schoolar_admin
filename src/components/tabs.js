
import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "carbon-components-react";

const TabView = ({ componentTabs }) => {

  return (
    <Tabs
      isFullWidth={true}
    >
      <TabList 
        aria-label="List of tabs"
        isFullWidth={true}
      >
        {componentTabs?.map((item, index) => (
          <Tab key={index} renderIcon={item.icon} >
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

export default TabView;
