import React from 'react';
import { Form, Stack, TextInput } from '@carbon/react';
import { FileUploader, FileUploaderItem, Select, SelectItem } from 'carbon-components-react';

const AddTeacherStepTwo = () => {

    // const navigate = useNavigate();
    return (
        <Form 
            onSubmit={() => {  
            }}
            isFullWidth
        >
            <Stack gap={7}>
                
                <div className='flex md:flex-row flex-col gap-4 w-full mt-4'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'first_name'}
                            required
                            invalidText="Please enter a valid first name"
                            labelText="TRCN identification number"
                            placeholder="Enter Your First Name"
                            // value={firstName}
                            // onChange={(e) => {
                            //     setFirstName(e.target.value)
                            // }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="select-1"
                            defaultValue="12"
                            labelText="Form class"
                        >
                            <SelectItem
                                hidden
                                value="12"
                                text="12"
                            />
                        </Select>
                    </div>
                </div>
                <FileUploader labelTitle="Upload school certificates" labelDescription="Max file size is 500mb. Only .jpg files are supported." buttonLabel="Add file" buttonKind="primary" size="md" filenameStatus="edit" accept={['.jpg', '.png']} multiple={true} disabled={false} iconDescription="Delete file" name="" />
                <FileUploaderItem className='-mt-2 flex items-center p-3 justify-between w-full bg-white' errorBody="500kb max file size. Select a new file and try again." errorSubject="File size exceeds limit" iconDescription="Delete file" invalid={false} name="README.md" status="edit" size="md" />
            </Stack>
        </Form>
    );
};

export default AddTeacherStepTwo;