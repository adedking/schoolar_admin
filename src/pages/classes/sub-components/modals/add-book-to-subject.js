import { Form, Modal, Select, SelectItem, TextInput } from 'carbon-components-react';
import React from 'react';
import AppButton from '../../../../components/app-button';
import { Stack } from '@carbon/react';

const AddBookToSubjectModal = ({isOpen, closeModal}) => {

    // const navigate = useNavigate();
    return (
        <Modal 
            modalHeading="Add book to Agricultural Science" 
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
                            name={'book_name'}
                            id="subject_name"
                            required
                            invalidText="Please enter a valid book name"
                            labelText="Book name"
                            placeholder="Input book name"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
                        />
                        <Select
                            id="book_classification"
                            defaultValue={20}
                            required
                            labelText="Book classification"
                            // value={classLevel}
                            // onChange={(e) => {
                            //     setClassLevel(e.target.value)
                            // }}
                        >
                            <SelectItem
                                value={null}
                                text="Compulsory / Not Compulsory"
                            />
                            <SelectItem
                            value={'compulsory'}
                            text={'Compulsory'}
                            />
                            <SelectItem
                            value={'not_compulsory'}
                            text={'Not Compulsory'}
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

export default AddBookToSubjectModal;