
import { Modal } from 'carbon-components-react';
import React from 'react';
import AppButton from '../app-button';


const DeleteModal = ({isOpen, closeModal, deleteTitle='Delete', deleteText="Are you sure you want to delete this?", deleteAction, deleteLoading, buttonText='Delete Student'}) => {

 return (
  <Modal 
    modalHeading={deleteTitle}
    primaryButtonText="Continue" 
    secondaryButtonText={"Cancel"}
    hasScrollingContent={false}
    passiveModal
    isFullWidth
    open={isOpen} 
    preventCloseOnClickOutside={true}
    onRequestClose={() => closeModal()}
    size={'sm'}
  > 
    <div className=' w-full'>
        <div className="flex items-center text-[15px] w-full font-normal h-[100px] px-4">
            {deleteText}
        </div>
        <div className='flex justify-end min-w-full'>
            {deleteLoading ?
            null :
            <AppButton
                type="button" 
                text={'Cancel'}
                kind={'secondary'} 
                className='min-w-[50%] h-[60px] mt-2'
                action={() => closeModal()}
            />
            }
            
            <AppButton
                type="button" 
                text={buttonText}
                kind={'primary'} 
                loading={deleteLoading}
                className='min-w-[50%] h-[60px] mt-2 !bg-red-600'
                action={() => deleteAction()}
            />
        </div>
    </div>
  </Modal>
  )   
}

export default DeleteModal;