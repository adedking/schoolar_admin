
import { Button, Modal, ProgressIndicator, ProgressStep } from 'carbon-components-react';
import React, { useState } from 'react';
import AddParentStepOne from './add-parent-step-one';
import AddParentStepTwo from './add-parent-step-two';
import { ArrowRight } from '@carbon/icons-react';


const AddParentModal = ({isOpen, closeModal, type}) => {
    const [payloadOne, setPayloadOne] = useState(null);
    const [payloadTwo, setPayloadTwo] = useState(null);

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
        description: "Guardian Information",
        content: <AddParentStepOne payload={payloadOne} setPayload={setPayloadOne} />,
        action: buttonAction('step_one')
      },
      {
        title: 'Step 2',
        complete: false,
        current: false,
        description: "Confirmation",
        content: <AddParentStepTwo payload={payloadTwo} setPayload={setPayloadTwo} />
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
    modalHeading="Add Parent/Guardian" 
    primaryButtonText="Continue" 
    secondaryButtonText={currentStep > 0 ? "Back" : ''}
    hasScrollingContent={false}
    passiveModal
    isFullWidth
    open={isOpen} 
    preventCloseOnClickOutside={true}
    onRequestClose={() => closeModal()}
    size={'lg'}
  > 
    <div className='flex flex-col justify-between w-full md:w-[600px] min-h-fit px-4 mb-4 mt-3'>
      <ProgressIndicator>
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
    <div className='flex justify-end'>
      {currentStep > 0 ?
      <Button
        type="submit" 
        className='min-w-[180px] h-[60px]'
        kind={'secondary'} 
        onClick={() => {
          secondaryRequestSubmit()
        }}
      >
        Back
      </Button>
      :
      null
      }
        
      <Button
          type="submit" 
          kind={'primary'} 
          className='min-w-[220px] h-[60px] mt-2'
          renderIcon={ArrowRight}
          onClick={() => {
            requestSubmit()
          }}
      >
          Continue
      </Button>
    </div>
    
  </Modal>
  )   
}

export default AddParentModal;