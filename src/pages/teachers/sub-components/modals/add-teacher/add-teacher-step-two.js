import React, { useEffect, useState } from 'react';
import { Form, Stack, TextInput } from '@carbon/react';
import DOMPurify from 'dompurify';
import { FileUploader, FileUploaderItem, Select, SelectItem } from 'carbon-components-react';
import { ArrowRight } from '@carbon/icons-react';
import AppButton from '../../../../../components/app-button';
import { useGetSubClassesList } from '../../../../../redux/classes/hook';
import { useForm } from 'react-hook-form';
import { checkError } from '../../../../../utils/functions';

const AddTeacherStepTwo = ({certifications, setCertifications, payload, setPayload, submit, backActionFn}) => {

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();
    const [trcnRegistrationNumber, setTrcnRegistrationNumber] = useState(payload?.trcn_registration_number)
    const [formClass, setFormClass] = useState(null)
    const [formClassName, setFormClassName] = useState('')

    const { data: classes } = useGetSubClassesList(
        1000,
        1,
    );
    useEffect(() => {
        if (payload) {
            setFormClass(payload.form_class)
            setFormClassName(payload.form_class_name)
        }
    }, [payload])

    const onFileChange = (e) => {
        let newCert = certifications ? certifications : []
        let curFile = [
            {
                certification: 'BSc.',
                file: e.target.files[0]
            }
        ]
        setCertifications([...newCert, ...curFile]);
    };

    const action = () => {
        const payload  = {
            trcn_registration_number:  DOMPurify.sanitize(trcnRegistrationNumber),
            form_class:  DOMPurify.sanitize(formClass),
            form_class_name:  DOMPurify.sanitize(formClassName),
        }
        setPayload(payload)
        submit()
    }

    return (
        <Form 
            onSubmit={handleSubmit(action)}
        >
            <Stack gap={6}>
                <div className='flex md:flex-row flex-col gap-4 w-full mt-8'>
                    <div className='md:w-1/2 w-full'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            required={false}
                            name={'trcn_registration_number'}
                            {...register('trcn_registration_number', { required: false })}
                            invalid={errors?.trcn_registration_number ? true : false}
                            invalidText={errors?.first_name?.message? errors?.trcn_registration_number?.message : 'This field is required'}
                            labelText="TRCN identification number"
                            placeholder="Enter TRCN number"
                            value={trcnRegistrationNumber}
                            onChange={(e) => {
                                checkError(false, e.target.value, 'trcn_registration_number', setError, clearErrors, setTrcnRegistrationNumber)
                            }}
                        />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <Select
                            id="form_class"
                            name='form_class'
                            labelText="Form class"
                            value={formClass}
                            onChange={(e) => {
                                checkError(false, e.target.value, 'form_class', setError, clearErrors, setFormClass)
                                let index = e.nativeEvent.target.selectedIndex;
                                setFormClassName(e.nativeEvent.target[index].text)
                            }}
                        >
                            {classes?.map((item, index) => (
                            <SelectItem
                                key={index}
                                value={item.value}
                                text={item.label}
                            />
                            ))}
                        </Select>
                    </div>
                </div>
                <FileUploader 
                    labelTitle="Upload school certificates" 
                    labelDescription="Max file size is 3mb. Only .jpg, .png, .jpeg, .pdf files are supported." 
                    buttonLabel="Choose file" 
                    buttonKind="primary" 
                    size="lg" 
                    filenameStatus="edit" 
                    accept={['.jpg', '.png', '.jpeg', '.pdf']} 
                    multiple={true} 
                    iconDescription="Upload multiple files"
                    name="certificates" 
                    onChange={(e) => {
                        onFileChange(e)
                    }}
                />
                {certifications?.length > 0 ? 
                <React.Fragment>
                    {certifications.map((item, index) => (
                    <FileUploaderItem 
                        key={index}
                        className='-mt-4 flex items-center p-3 justify-between w-full !bg-white h-[40px] !text-[14px]' 
                        iconDescription="Delete file" 
                        invalid={false}
                        name={item.file.name}
                        status="edit"
                        size="sm" 
                        onDelete={() => {
                            let newCert = JSON.parse(JSON.stringify(certifications))
                            newCert.splice(index, 1)
                            setCertifications(newCert)
                        }}
                    />))}
                </React.Fragment>
                :
                null
                }
            </Stack>
            <div className='flex justify-end -mx-4 mt-8 gap-0.5'>
                <AppButton
                    type="button" 
                    kind={'secondary'} 
                    className='!min-w-[180px] h-[60px]'
                    action={() => {backActionFn()}}
                    text={'Back'}
                />
                <AppButton
                    type="submit" 
                    kind={'primary'} 
                    className='!min-w-[180px] h-[60px]'
                    renderIcon={ArrowRight}
                    text={'Continue'}
                />
            </div>
        </Form>
    );
};

export default AddTeacherStepTwo;