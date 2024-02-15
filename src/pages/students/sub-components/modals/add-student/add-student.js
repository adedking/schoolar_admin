import React, { useState } from 'react';
import { Modal, ProgressIndicator, ProgressStep } from 'carbon-components-react';
import AddStudentStepOne from './add-student-step-one';
import AddStudentStepTwo from './add-student-step-two';
import AddStudentStepThree from './add-student-step-three';

const AddStudentModal = ({isOpen, closeModal, student}) => {

  const [currentStep, setCurrentStep] = useState(0);

  const [studentUUID, setStudentUUID] = useState(null)

  const [steps, setSteps] = useState([
    {
      title: 'Step 1',
      complete: false,
      current: true,
      description: "Basic Information",
    },
    {
      title: 'Step 2',
      complete: false,
      current: false,
      description: "Health Details",
    },
    {
      title: 'Step 3',
      complete: false,
      current: false,
      description: "Guardian Details",
    },
  ]);

  const changeStep = (type) => {
    let newArray = steps;
    let curStep = currentStep
    if (type === 'add') {
      curStep += 1
    } else {
      curStep -= 1
    }
    
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

  return (
    <Modal 
      modalHeading={studentUUID ? "Update Student Information" : "Add Student Information"}
      primaryButtonText="Continue" 
      secondaryButtonText={currentStep > 0 ? "Back" : ''}
      hasScrollingContent={false}
      passiveModal
      isFullWidth
      open={isOpen} 
      className='!overflow-auto !backdrop-blur-sm bg-black/30'
      preventCloseOnClickOutside={true}
      onRequestClose={() => closeModal()}
      size={'lg'}
    > 
      <div className='flex flex-col justify-between w-full md:w-[600px] min-h-fit mt-3'>
        <div className='w-full px-4'>
        <ProgressIndicator>
          {steps?.map((item, index) => (
            <ProgressStep key={index} complete={item.complete} current={item.current} label={item.title} description={item.description} />
          ))}
        </ProgressIndicator>
        </div>
        {steps?.map((item, index) => (
          <div key={index}>
          {item.current && currentStep === 0 ?
          <AddStudentStepOne student={student} changeStep={changeStep} setStudentUUID={setStudentUUID}  />
          : item.current && currentStep === 1 ?
          <AddStudentStepTwo student={student} changeStep={changeStep} studentUUID={studentUUID} />
          : item.current && currentStep === 2 ?
          <AddStudentStepThree student={student} changeStep={changeStep} studentUUID={studentUUID} />
          :
          null
          }
          </div>
        ))}
      </div>
    </Modal>
  )   
}

export default AddStudentModal;