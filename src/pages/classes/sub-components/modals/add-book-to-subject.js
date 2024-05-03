import { FileUploaderDropContainer, FileUploaderItem, FormGroup, Form, Modal, TextInput, NumberInput, Toggle, FormLabel } from 'carbon-components-react';
import React, { useState } from 'react';
import AppButton from '../../../../components/app-button';
import { Stack } from '@carbon/react';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../utils/functions';
import { useAddSubjectBook } from '../../../../redux/subjects/hook';

const AddBookToSubjectModal = ({isOpen, closeModal, subjectInfo}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();

    const [form, setForm] = useState({
        book_name: '',
        authors: '',
        year_published: '1990',
        compulsory: true,
        can_purchase_externally: false,
        cost: 1,
        file: '',
    })

    const [fileURL, setFileURL] = useState();
    const [fileSelected, setFileSelected] = useState(false)

    const handleChange = (e, type='text', name='') => {
        if (type === 'number') {
          setForm({
            ...form,
            [name]: e.value
          })
          
        } else {
          setForm({
            ...form,
            [e.target.name]: e.target.value
          })
        }
    }

    const onFileChange = (e) => {
        setForm({
            ...form,
            file: e.target.files[0]
        })
        setFileURL(URL.createObjectURL(e.target.files[0]))
        setFileSelected(true)
    };

    const {mutateAsync: addSubjectBook, isLoading: addSubjectBookLoading} = useAddSubjectBook()

    const submitForm = async () => {
        const formData = new FormData();
        if (form.file) {
            formData.append('file', form.file)
        }
        formData.append('book_name', form.book_name)
        formData.append('authors', form.authors)
        formData.append('year_published', form.year_published)
        formData.append('compulsory', form.compulsory ? 1 : 0)
        formData.append('can_purchase_externally', form.can_purchase_externally ? 1 : 0)
        formData.append('cost', form.cost)

        let payload = {
            id: subjectInfo.id,
            data: formData
        }
        await addSubjectBook(payload).then(() => {
          closeModal()
        })
      };
    
    return (
        <Modal 
            modalHeading={`Add book to ${subjectInfo?.name}` }
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
            <Form onSubmit={handleSubmit(submitForm)}>
            <div className='flex flex-col justify-between w-full md:w-[550px] min-h-fit px-4 mb-4'>
                
                <Stack gap={4}>
                    <FormGroup 
                        legendText={''}
                    >
                        <Stack gap={5}>
                            <div className='flex gap-3 items-center justify-betweenmt-3'>
                                <div className='flex flex-col justify-center item-start gap-4 w-full'>
                                    <FormLabel className='text-[15px] font-bold'>Upload book image - (Optional)</FormLabel>
                                    <FormLabel className='text-[12px] font-normal -mt-3'>Max file size is 2mb. Supported file types are .jpg, .jpeg and .png.</FormLabel>
                                    <FileUploaderDropContainer 
                                        size='md' 
                                        required={false}
                                        name='file'
                                        labelText={"Drag and drop files here or click to upload" }
                                        multiple={true} 
                                        accept={['.jpeg', '.png', '.jpg', 'gif']} 
                                        onAddFiles={(e) => {
                                            onFileChange(e)
                                        }}
                                    />
                                </div>
                                {fileURL && fileSelected?
                                <div className='flex justify-end w-1/4'>
                                    <div className='flex items-center justify-center h-[96px] w-[96px] !bg-white'>
                                        <img src={fileURL} alt='profile_picture' />
                                    </div>
                                </div>
                                :
                                null
                                }
                            </div>
                            
                            {fileSelected?
                            <FileUploaderItem
                                className='flex items-center p-3 justify-between w-full bg-white' 
                                errorBody="500kb max file size. Select a new file and try again." 
                                errorSubject="File size exceeds limit" 
                                iconDescription="Delete file" 
                                invalid={false} 
                                name={form.file?.name}
                                status="edit" 
                                size="md" 
                                onDelete={() => {
                                    setForm({
                                        ...form,
                                        file: null
                                    })
                                    setFileURL(null)
                                    setFileSelected(false)
                                }}
                            />
                            :
                            null
                            }
                        </Stack>
                    </FormGroup>
                    <div className='flex flex-col gap-4 w-full mt-3'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            id={'book_name'}
                            name={'book_name'}
                            {...register('book_name', { required: true })}
                            invalid={errors?.book_name ? true : false}
                            invalidText={errors?.book_name?.message? errors?.book_name?.message : 'This field is required'}
                            value={form.class_name}
                            labelText="Book Name"
                            placeholder="Input book name"
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'book_name', setError, clearErrors, handleChange)
                            }}
                        />
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            id={'authors'}
                            name={'authors'}
                            {...register('authors', { required: true })}
                            invalid={errors?.authors ? true : false}
                            invalidText={errors?.authors?.message? errors?.book_name?.message : 'This field is required'}
                            value={form.authors}
                            labelText="Author Name(s)"
                            placeholder="Input author names (separate with commas)"
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'book_name', setError, clearErrors, handleChange)
                            }}
                        />
                        <div className='flex md:flex-row flex-col w-full mb-4 gap-4'>
                            <div className='md:w-1/2 w-full'>
                                <TextInput
                                    className='min-w-full'
                                    kind={'text'}
                                    name={'year_published'}
                                    id="year_published"
                                    required
                                    invalidText="Please enter a valid publish year"
                                    labelText="Year published"
                                    placeholder="Input year published"
                                    // value={name}
                                    // onChange={(e) => {
                                    //     setName(e.target.value)
                                    // }}
                                />
                            </div>
                            <div className='md:w-1/2 w-full'>
                            <NumberInput
                                className='min-w-full'
                                kind={'text'}
                                name={'cost'}
                                id="cost"
                                {...register('cost', { required: true })}
                                invalid={errors?.cost ? true : false}
                                invalidText={errors?.cost?.message? errors?.cost?.message : 'This field is required'}
                                label="Book Cost"
                                placeholder="Enter cost of book"
                                value={form.cost}
                                onChange={(e, state) => {
                                    if (form.cost) {
                                        checkError(true, state, state.value, 'cost', setError, clearErrors, handleChange, 'number')
                                    } else {
                                        checkError(true, state, 1, 'cost', setError, clearErrors, handleChange, 'number')
                                    }
                                }}
                            />
                            </div>
                        </div>
                        <hr className='divider -mt-2' />
                        <div className='flex flex-row justify-between items-center gap-4'>
                            <span className='text-[14px]'>Is this book compulsory?</span>
                            <Toggle 
                                size="md"  
                                id="compulsory" 
                                hideLabel
                                toggled={form.compulsory}
                                onToggle={() => {
                                    setForm({
                                        ...form,
                                        compulsory: !form.compulsory
                                    })
                                }}
                            />
                        </div>
                        <hr className='divider -mt-2' />
                        <div className='flex flex-row justify-between items-center gap-4'>
                            <span className='text-[14px]'>Can this book be purchased externally?</span>
                            <Toggle 
                                size="md"  
                                id="can_purchase_externally" 
                                hideLabel
                                toggled={form.can_purchase_externally}
                                onToggle={() => {
                                    setForm({
                                        ...form,
                                        can_purchase_externally: !form.can_purchase_externally
                                    })
                                }}
                            />
                        </div>
                        <hr className='divider -mt-2' />
                    </div>
                </Stack>
                
            </div>
            <div className='flex justify-end'>
                <AppButton
                    type="submit" 
                    kind={'primary'} 
                    className={'!mt-5 h-[64px] !w-[224px]'}
                    text={'Save Book'}
                    loading={addSubjectBookLoading}
                />
            </div>
            </Form>
        </Modal>
    );
};

export default AddBookToSubjectModal;