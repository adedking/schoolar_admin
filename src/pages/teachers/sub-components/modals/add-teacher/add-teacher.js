/* eslint-disable no-unused-vars */

import { Modal, ProgressIndicator, ProgressStep } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import AddTeacherStepOne from './add-teacher-step-one';
import AddTeacherStepTwo from './add-teacher-step-two';
import AddTeacherStepThree from './add-teacher-step-three';
import { useAddTeacher } from '../../../../../redux/teachers/hook';


const AddTeacherModal = ({isOpen, closeModal}) => {
  const [payloadOne, setPayloadOne] = useState();
  const [payloadTwo, setPayloadTwo] = useState();
  const [payloadThree, setPayloadThree] = useState();

  useEffect(() => {
    setPayloadThree({...payloadOne, ...payloadTwo})
  }, [payloadOne, payloadTwo])

  const [currentStep, setCurrentStep] = useState(0);

  const {mutateAsync: addTeacher, isLoading: addTeacherLoading} = useAddTeacher()

  const [steps, setSteps] = useState([
    {
      title: 'Step 1',
      complete: false,
      current: true,
      description: "Basic information",
      // action: requestSubmit()
    },
    {
      title: 'Step 2',
      complete: false,
      current: false,
      description: "Admin details",
      // action: requestSubmit()
    },
    {
      title: 'Step 3',
      complete: false,
      current: false,
      description: "Confirmation",
      // action: requestSubmit()
    },
  ]);

  const requestSubmit = () => {
    if (currentStep === 0) {
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
      setCurrentStep(curStep)
      
    } else if (currentStep === 1) {
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
      setCurrentStep(curStep)
    } else if (currentStep === 2) {
      
      const formData = new FormData();
      formData.append('first_name', payloadThree.first_name)
      formData.append('last_name', payloadThree.last_name)
      formData.append('email', payloadThree.email)
      formData.append('mobile', payloadThree.mobile)
      formData.append('file', payloadThree.file)
      formData.append('country', payloadThree.country)
      formData.append('state', payloadThree.state)
      formData.append('city', payloadThree.city)
      formData.append('address', payloadThree.address)
      formData.append('trcn_registration_number', payloadThree.trcn_registration_number)
      formData.append('form_class', payloadThree.form_class)
      formData.append('certifications', payloadThree.certifications)
      console.log(formData)
      addTeacher(formData).then(() => {
        closeModal()
      })
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
    setCurrentStep(curStep)
  }

  return (
    <Modal 
      modalHeading="Add Teacher" 
      primaryButtonText="Continue" 
      secondaryButtonText={currentStep > 0 ? "Back" : ''}
      hasScrollingContent={false}
      passiveModal
      isFullWidth
      className='!backdrop-blur-sm bg-black/30'
      open={isOpen} 
      preventCloseOnClickOutside={true}
      onRequestClose={() => closeModal()}
      size={'lg'}
    > 
      <div className='flex flex-col justify-between w-full md:w-[600px] min-h-fit px-4 mt-3'>
        <ProgressIndicator>
          {steps?.map((item, index) => (
            <ProgressStep key={index} complete={item.complete} current={item.current} label={item.title} description={item.description} />
          ))}
        </ProgressIndicator>
        {steps?.map((item, index) => (
          <React.Fragment key={index}>
            {item.current?
            <>
              {index === 0 && currentStep === 0 ?
              <AddTeacherStepOne 
                payload={payloadOne} 
                setPayload={setPayloadOne} 
                submit={requestSubmit}
              /> : index === 1 && currentStep === 1 ?
              <AddTeacherStepTwo 
                payload={payloadTwo} 
                setPayload={setPayloadTwo} 
                submit={requestSubmit}
                backActionFn={secondaryRequestSubmit}
              /> :
              <AddTeacherStepThree 
                payload={payloadThree} 
                setPayload={setPayloadThree} 
                submit={requestSubmit}
                backActionFn={secondaryRequestSubmit}
                addTeacherLoading={addTeacherLoading}
              />
              }
              {item.content}
            </>
            :
            null
            }
          </React.Fragment>
        ))}
      </div>
    </Modal>
  )   
}

export default AddTeacherModal;