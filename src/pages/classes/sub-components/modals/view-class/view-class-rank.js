
import React from 'react';
import { ChartColumn } from '@carbon/icons-react';
import RightTabView from '../../../../../components/right-panel-tabs';
import RankInfo from './class-rank';

const ViewClassRank = () => {
  const tabs = [
    {
      title: 'Rankings of classes',
      content: <RankInfo  />,
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