import { Form, Modal, TextInput } from 'carbon-components-react';
import React from 'react';
import AppButton from '../../../../components/app-button';
import { Stack } from '@carbon/react';

const MarkSubjectAttendance = ({isOpen, closeModal}) => {

    // const navigate = useNavigate();
    return (
        <Modal 
            modalHeading="Mark subject attendance" 
            primaryButtonText="Save" 
            secondaryButtonText={''}
            hasScrollingContent={false}
            passiveModal
            isFullWidth
            open={isOpen} 
            preventCloseOnClickOutside={true}
            onRequestClose={() => closeModal()}
            size={'lg'}
        > 
            <Form
                // onSubmit={(e) => {
                //     e.preventDefault()
                //     submitForm()
                // }}
            >
            <div className='flex flex-col justify-between w-full md:w-[550px] min-h-fit px-4 mb-4'>
                <Stack gap={5}>
                    <div className='flex flex-col gap-4 w-full mt-6'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            type='date'
                            name={'attendance_date'}
                            id="attendance_date"
                            invalidText="Please enter a valid subject name"
                            labelText="Attendance Date"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
                        />
                    </div>
                </Stack>
                
            </div>
            <div className='flex justify-end'>
                <AppButton
                    type="submit" 
                    kind={'primary'} 
                    // renderIcon={ArrowRight}
                    // action={submitForm}
                    className={'!mt-5 h-[64px] !w-[224px]'}
                    // loading={isLoading}
                    text={'Add Subject'}
                    // loading={addClassLoading}
                />
            </div>
            </Form>
        </Modal>
    );
};

export default MarkSubjectAttendance;