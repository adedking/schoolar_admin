
import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel, Grid, Column } from "carbon-components-react";

const TabView = ({ componentTabs }) => {

  return (
    <Grid condensed className='!bg-background p-3 px-2 min-h-[500px]'>
      <Column lg={16} md={16} sm={4}>
        <Tabs>
          <TabList 
            aria-label="List of tabs"
            fullWidth
            activation="manual"
            className='!min-w-[100%]'
          >
            {componentTabs?.map((item, index) => (
              <Tab key={index} renderIcon={item.icon} className={`md:min-w-[180px] !text-[14px] !h-[40px]`} >
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
      </Column>
    </Grid>
  );
};

export default TabView;
