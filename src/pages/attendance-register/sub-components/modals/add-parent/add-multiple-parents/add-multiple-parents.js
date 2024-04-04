/* eslint-disable no-unused-vars */
import { FileUploaderDropContainer, FileUploaderItem, Form, FormGroup, FormLabel, Modal } from 'carbon-components-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack } from '@carbon/react';
import AppButton from '../../../../../../components/app-button';
import { ArrowRight } from '@carbon/icons-react';
import { useAddMultipleStudents } from '../../../../../../redux/students/hook';

const AddMultipleParentsModal = ({isOpen, closeModal}) => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [form, setForm] = useState({
        file: '',
    })
    const [file, setFile] = useState()
    const [fileURL, setFileURL] = useState()
    const [fileSelected, setFileSelected] = useState(file ? true : false)

    const onFileChange = (e) => {
        setFileURL(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
        setFileSelected(true)
    };

    const {mutateAsync: addParents, isLoading: addParentsLoading} = useAddMultipleStudents()

    const requestSubmit = async () => {
        const formData = new FormData();
        if (file) {
            formData.append('file', file)
        }
        await addParents(formData).then(() => {
        closeModal()
        })
    }

    return (
        <Modal 
            modalHeading="Add Multiple Parents" 
            primaryButtonText="Continue" 
            secondaryButtonText={''}
            hasScrollingContent={false}
            passiveModal
            isFullWidth
            className='!backdrop-blur-sm bg-black/30'
            open={isOpen} 
            preventCloseOnClickOutside={true}
            onRequestClose={() => closeModal()}
            size={'lg'}
        > 
        <div className='flex flex-col justify-between w-full md:w-[600px] min-h-fit px-4'>
            <Form
                onSubmit={handleSubmit(requestSubmit)}
            >
            <Stack gap={6}>
                <FormGroup 
                    legendText={''}
                >
                    <Stack gap={5}>
                        <div className='flex gap-3 items-center justify-between'>
                            <div className='flex flex-col justify-center item-start gap-4 w-full'>
                                <div 
                                    className='flex justify-between'
                                >
                                    <div className='text-[15px] font-bold w-1/2'>Select File</div>
                                    <div className='flex justify-between text-primary hover:underline cursor-pointer'>
                                        Download Template
                                    </div>
                                </div>
                                
                                <FormLabel className='text-[12px] font-normal -mt-3'>Max file size is 3mb. Supported file types are .xlsx</FormLabel>

                                <FileUploaderDropContainer 
                                    size='md' 
                                    required={false}
                                    labelText={"Drag and drop files here or click to upload" }
                                    multiple={true} 
                                    name={'file'}
                                    accept={['.xlsx']} 
                                    onAddFiles={(e) => {
                                        onFileChange(e)
                                    }}
                                />
                            </div>
                            {fileURL?
                            <div className='flex justify-end w-1/4 pr-4'>
                                <div className='flex items-center justify-center h-[96px] w-[96px] !bg-white'>
                                    <img src={fileURL} alt='profile_picture' />
                                </div>
                                
                            </div>
                            :null}
                        </div>
                        
                        {fileSelected?
                        <FileUploaderItem 
                            className='flex items-center p-3 justify-between w-full bg-white' 
                            errorBody="500kb max file size. Select a new file and try again." 
                            errorSubject="File size exceeds limit" 
                            iconDescription="Delete file" 
                            invalid={false} 
                            name={file?.name}
                            status="edit" 
                            size="md" 
                            onDelete={() => {
                                setFile(null)
                                setFileURL(null)
                                setFileSelected(false)
                            }}
                        />
                        :
                        null
                        }
                    </Stack>
                </FormGroup>
            </Stack>
            <div className='flex justify-end mt-8 -mx-4'>
                <div className='flex justify-end w-full'>
                    <AppButton
                        type="submit" 
                        kind={'primary'} 
                        className='!min-w-[220px] h-[60px]'
                        renderIcon={ArrowRight}
                        text={'Save & Close'}
                        loading={addParentsLoading}
                    />
                </div>
            </div>
            </Form>
        </div>
        </Modal>
    )   
}

export default AddMultipleParentsModal;