
import React from 'react';
import SortRankInfo from './sort-class-rank';
import { ChartColumn } from '@carbon/icons-react';
import RightTabView from '../../../../../components/right-panel-tabs';

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
            <RightTabView componentTabs={tabs}/>
        </div>
        
    )   
}

export default ViewClassRank;