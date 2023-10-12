
import React from 'react';
import TabView from '../../../../../components/tabs';
import SortRankInfo from './sort-class-rank';
import { ChartColumn } from '@carbon/icons-react';

const ViewClassRank = () => {
    const tabs = [
      {
        title: 'Sort the rankings of classes',
        content: <SortRankInfo  />,
        icon: ChartColumn
      },
    ];

    return (
        <div>
            <TabView componentTabs={tabs}/>
        </div>
        
    )   
}

export default ViewClassRank;