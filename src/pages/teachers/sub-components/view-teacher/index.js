
import React from 'react';
import TabView from '../../../../components/tabs';
import TeacherBasicInfo from './view-basic-info';
import TeachingClasses from './teaching-classes';
import Qualifications from './qualifications';

const ViewTeacher = () => {
    const tabs = [
      {
        title: 'Basic Information',
        content: <TeacherBasicInfo  />,
      },
      {
        title: 'Teaching Classes',
        content: <TeachingClasses  />
      },
      {
        title: 'Qualifications',
        content: <Qualifications />
      },
    ];

    return (
        <div>
            <TabView componentTabs={tabs}/>
        </div>
        
    )   
}

export default ViewTeacher;