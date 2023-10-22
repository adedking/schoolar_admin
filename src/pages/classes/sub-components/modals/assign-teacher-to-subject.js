import React from 'react';
import { Form, Modal, Select, SelectItem } from 'carbon-components-react';
import AppButton from '../../../../components/app-button';

const AssignTeacherToSubjectModal = ({isOpen, closeModal}) => {
    // const navigate = useNavigate();
    return (
        <Modal 
            modalHeading="Assign a teacher to teach English in class 12 - A" 
            primaryButtonText="Continue" 
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
                <div className='flex flex-col justify-between w-full md:w-[500px] min-h-fit px-4 mb-4 mt-3'>
                    <Select
                        id="teacher_id"
                        defaultValue={1}
                        required
                        labelText="Search and select teacher"
                        // value={classLevel}
                        // onChange={(e) => {
                        // setClassLevel(e.target.value)
                        // }}
                    >
                        <SelectItem
                            value={null}
                            text="Select teacher"
                        />
                        <SelectItem
                            value={1}
                            text={'Adedokun Agunbiade'}
                        />
                        <SelectItem
                            value={2}
                            text={'Omotolani Olurotimi'}
                        />
                        <SelectItem
                            value={3}
                            text={'Oladotun Aboaba'}
                        />
                    </Select>
                </div>
                <div className='flex justify-end'>
                    <AppButton
                        type="submit" 
                        kind={'primary'} 
                        // renderIcon={ArrowRight}
                        // action={submitForm}
                        className={'!mt-5 h-[64px] !w-[224px]'}
                        // loading={isLoading}
                        text={'Assign Teacher'}
                        // loading={addClassLoading}
                    />
                </div>
            </Form>
        </Modal>
    );
};

export default AssignTeacherToSubjectModal;