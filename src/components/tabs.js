
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Grid, Column } from "carbon-components-react";

const TabView = ({ componentTabs}) => {

  const [selectedTabIndex, setSelectedTabIndex] = useState(0)

  const [className, setClassName] = useState(`md:min-w-[180px] !text-[14px] !h-[40px]`)
  
  useEffect(() => {
    if (componentTabs && componentTabs.length > 0) {
      if (componentTabs.length === 1) {
        setClassName(`md:w-[300px] w-fit !text-[14px] !h-[40px]`)
      } else if (componentTabs.length === 2) {
        setClassName(`md:w-[300px] w-fit !text-[14px] !h-[40px]`)
      } else if (componentTabs.length === 3) {
        setClassName(`md:w-[300px] w-fit !text-[14px] !h-[40px]`)
      } else if (componentTabs.length === 4) {
        setClassName(`md:w-[250px] w-fit !text-[14px] !h-[40px]`)
      } else  if (componentTabs.length === 5) {
        setClassName(`md:w-[200px] w-fit !text-[14px] !h-[40px]`)
      } else {
        setClassName(`md:w-[180px] w-fit !text-[14px] !h-[40px]`)
      }
    }
  }, [componentTabs])

  const onChangeTab = (event) => {
    setSelectedTabIndex(event.selectedIndex)
  }

  return (
    <Grid condensed className='!bg-background py-3 min-h-[500px] w-full'>
      <Column lg={16} md={16} sm={4}>
        <Tabs
          className='!min-w-[100%] -mx-2'
          selectedIndex={selectedTabIndex}
          onChange={(e) => {
            onChangeTab(e)
          }}
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
              <>
              {selectedTabIndex === index ?
              <TabPanel key={index} className='-mx-4'>
                {item.content}
              </TabPanel>
              :null}
              </>
            ))}
          </TabPanels>
        </Tabs>
      </Column>
    </Grid>
  );
};

export default TabView;
