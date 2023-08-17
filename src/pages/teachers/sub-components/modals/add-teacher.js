
import { Modal } from 'carbon-components-react';
import React, { useState } from 'react';
import TabView from '../../../../components/tabs';

const AddTeacherModal = ({isOpen, closeModal}) => {
    const [activeTab, setActiveTab] = useState(1);
    const Tabs = [
        {
          title: 'Step 1',
          Content: 'First'
        },
        {
          title: 'Step 2',
          Content: 'Second'
        },
        {
          title: 'Step 3',
          Content: 'Third'
        },
    ];

 return (
    <Modal 
        modalHeading="Add Teacher" 
        primaryButtonText="Continue" 
        secondaryButtons={false}
        // secondaryButtonText="Cancel" 
        hasScrollingContent={false}
        open={isOpen} 
        preventCloseOnClickOutside={true}
        onRequestClose={() => closeModal()}
    >
    <TabView
        Tabs={Tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
    />
    {/* <p style={{
        marginBottom: '1rem'
        }}
    >
        Custom domains direct requests for your apps in this Cloud Foundry
        organization to a URL that you own. A custom domain can be a shared
        domain, a shared subdomain, or a shared domain and host.
    </p>
    <TextInput 
        data-modal-primary-focus 
        id="text-input-1" 
        labelText="Domain name" 
        placeholder="e.g. github.com" 
        style={{
        marginBottom: '1rem'
    }} />
    <Select 
        id="select-1" 
        defaultValue="us-south" 
        labelText="Region">
        <SelectItem 
            value="us-south" 
            text="US South" />
        <SelectItem 
            value="us-east" 
            text="US East" />
    </Select> */}
</Modal>)   
}

export default AddTeacherModal;