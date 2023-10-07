
import { Modal, ProgressIndicator, ProgressStep } from 'carbon-components-react';
import React, { useState } from 'react';
// import TabView from '../../../../components/tabs';
import AddTeacherStepOne from './add-teacher-step-one';
import AddTeacherStepTwo from './add-teacher-step-two';
import AddTeacherStepThree from './add-teacher-step-three';
// import { useEffect } from 'react';


const AddTeacherModal = ({isOpen, closeModal}) => {
    const [payloadOne, setPayloadOne] = useState(null);
    const [payloadTwo, setPayloadTwo] = useState(null);
    const [payloadThree, setPayloadThree] = useState(null);

    const [currentStep, setCurrentStep] = useState(0);

    const buttonAction = (action) => {
      if (action === 'step_one') {
        
      } else if (action === 'step_two') {

      } else {

      }
    }
    const [steps, setSteps] = useState([
      {
        title: 'Step 1',
        complete: false,
        current: true,
        description: "Basic information",
        content: <AddTeacherStepOne payload={payloadOne} setPayload={setPayloadOne} />,
        action: buttonAction('step_one')
      },
      {
        title: 'Step 2',
        complete: false,
        current: false,
        description: "Admin details",
        content: <AddTeacherStepTwo payload={payloadTwo} setPayload={setPayloadTwo} />
      },
      {
        title: 'Step 3',
        complete: false,
        current: false,
        description: "Confirmation",
        content: <AddTeacherStepThree payload={payloadThree} setPayload={setPayloadThree} />
      },
    ]);

    const requestSubmit = () => {
      let newArray = steps;
      let curStep = currentStep + 1
      newArray.forEach((element, index) => {
        
        if(index > curStep) {
          newArray[index].complete = false
          newArray[index].current = false
        } else if (index === curStep) {
          newArray[index].complete = false
          newArray[index].current = true
        } else {
          newArray[index].complete = true
          newArray[index].current = false
        }
      });
      setSteps(newArray)
      if (currentStep < steps.length - 1) {
        setCurrentStep(curStep)
      } else {
        closeModal()
      }
    }

    const secondaryRequestSubmit = () => {
      let newArray = steps;
      let curStep = currentStep - 1
      newArray.forEach((element, index) => {
        if(index > curStep) {
          newArray[index].complete = false
          newArray[index].current = false
        } else if (index === curStep) {
          newArray[index].complete = false
          newArray[index].current = true
        } else {
          newArray[index].complete = true
          newArray[index].current = false
        }
      });
      setSteps(newArray)
      if (currentStep > 0) {
        setCurrentStep(curStep)
      }
    }

 return (
    <Modal 
      modalHeading="Add Teacher" 
      primaryButtonText="Continue" 
      secondaryButtonText={currentStep > 0 ? "Back" : ''}
      hasScrollingContent={false}
      isFullWidth
      open={isOpen} 
      preventCloseOnClickOutside={true}
      onRequestClose={() => closeModal()}
      onRequestSubmit={() => { requestSubmit() }}
      onSecondarySubmit={() => { secondaryRequestSubmit() }}
      size={'lg'}
    > 
      <div className='mt-3 md:w-[550px] min-h-fit px-4 mb-6'>
        <ProgressIndicator
        >
          {steps?.map((item, index) => (
            <ProgressStep key={index} complete={item.complete} current={item.current} label={item.title} description={item.description} />
          ))}
        </ProgressIndicator>
        {steps?.map((item, index) => (
          <>
          {item.current?
          <div key={index}>
            {item.content}
          </div>
          :
          null
          }
          </>
          
        ))}
      </div>
      
    </Modal>
    )   
}

export default AddTeacherModal;