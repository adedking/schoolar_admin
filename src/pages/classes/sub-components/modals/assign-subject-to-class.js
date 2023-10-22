import { Form, Modal, Select, SelectItem, TextInput } from 'carbon-components-react';
import React from 'react';
import AppButton from '../../../../components/app-button';
import { Stack } from '@carbon/react';

const AddSubjectToClassModal = ({isOpen, closeModal}) => {

    // const navigate = useNavigate();
    return (
        <Modal 
            modalHeading="Add a subject to class 12 - A" 
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
            <div className='flex flex-col justify-between w-full md:w-[550px] min-h-fit px-4 mb-4'>
                
                <Stack gap={5}>
                    <div className='flex flex-col gap-4 w-full mt-6'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'subject_name'}
                            id="subject_name"
                            required
                            invalidText="Please enter a valid subject name"
                            labelText="Subject name"
                            placeholder="Input subject name"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
                        />
                        <Select
                            id="subject_classification"
                            defaultValue={20}
                            required
                            labelText="Subject classification"
                            // value={classLevel}
                            // onChange={(e) => {
                            //     setClassLevel(e.target.value)
                            // }}
                        >
                            <SelectItem
                                value={null}
                                text="Compulsory / Voluntary"
                            />
                            <SelectItem
                            value={'compulsory'}
                            text={'Compulsory'}
                            />
                            <SelectItem
                            value={'voluntary'}
                            text={'Voluntary'}
                            />
                        </Select>
                        <Select
                            id="primary_teacher"
                            defaultValue={null}
                            required
                            labelText="Primary Teacher"
                            // value={classLevel}
                            // onChange={(e) => {
                            //     setClassLevel(e.target.value)
                            // }}
                        >
                            <SelectItem
                                value={null}
                                text="Select a teacher"
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
                        <Select
                            id="support_teacher"
                            defaultValue={null}
                            required
                            labelText="Support Teacher"
                            // value={classLevel}
                            // onChange={(e) => {
                            //     setClassLevel(e.target.value)
                            // }}
                        >
                            <SelectItem
                                value={null}
                                text="Select a teacher"
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

export default AddSubjectToClassModal;