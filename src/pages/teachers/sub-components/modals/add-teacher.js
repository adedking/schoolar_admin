
import { Modal } from 'carbon-components-react';
import React, { useState } from 'react';
import TabView from '../../../../components/tabs';
import AddTeacherStepOne from '../add-teacher-step-one';

const AddTeacherModal = ({isOpen, closeModal}) => {
    const [activeTab, setActiveTab] = useState(1);
    const Tabs = [
        {
          title: 'Step 1',
          content: <AddTeacherStepOne />
        },
        {
          title: 'Step 2',
          content: 'Second'
        },
        {
          title: 'Step 3',
          content: 'Third'
        },
    ];

 return (
    <Modal 
        modalHeading="Add Teacher" 
        primaryButtonText="Continue" 
        secondaryButtons={false}
        hasScrollingContent={false}
        open={isOpen} 
        preventCloseOnClickOutside={true}
        onRequestClose={() => closeModal()}
        isFullWidth={false}
    >
      <TabView
        componentTabs={Tabs}
      />
    </Modal>
    )   
}

export default AddTeacherModal;