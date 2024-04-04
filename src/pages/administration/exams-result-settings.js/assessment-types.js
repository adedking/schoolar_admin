import React, { useState } from 'react';
import { TextInput, ComboBox } from 'carbon-components-react';
// import { checkError } from '../../../utils/functions';
import { useForm } from 'react-hook-form';

const AssessmentTypes = () => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const items = [
        { id: 'test', text: 'Test' },
        { id: 'exam', text: 'Exam' },
        { id: 'attendance', text: 'Attendance' },
    ];
    
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    
    const handleSelectItem = (event) => {
        const selectedItem = event.selectedItem;
        setSelectedItem(selectedItem);
        setInputValue(selectedItem ? selectedItem.text : '');
    };

    const { register, handleSubmit, formState: { errors }, clearErrors, setError } = useForm();
    const [form, setForm] = useState({})

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row justify-between items-center text-[15px]'>
                <span>Assessment Types</span>
                <div className='flex items-center justify-end gap-2 p-2 bg-white w-fit '>
                    <span className='text-[13px]'>Minimum Pass Score:</span>
                    <div>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'book_name'}
                            id="subject_name"
                            required
                            invalidText="Please enter a valid book name"
                            placeholder="Enter Grade Remark"
                        />
                    </div>
                </div>
                
            </div>
            <hr className='divider' />
            <div className='flex flex-col gap-2'>
                <div className='flex gap-4 w-full p-2 bg-white'>
                    <div className='w-1/4'>
                        <ComboBox 
                            id="class"
                            items={items ? items : []} 
                            value={inputValue}
                            onInput={(e) => {
                                console.log(e)
                                setInputValue(e?.selectedItem?.text)
                            }}
                            placeholder="Select or type an Assessment type"
                            itemToString={item => item ? item.text : ''} 
                            titleText="Search and select an Assessment type"
                            shouldFilterItem={() => true}
                        />
                    </div>
                    <div className='w-1/4'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'book_name'}
                            id="subject_name"
                            required
                            invalidText="Please enter a valid book name"
                            labelText="Percentage"
                            placeholder="Enter Grade Remark"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
                        />
                    </div>
                </div>
                <hr className='divider mt-2' />
            </div>
        </div>
    );
};

export default AssessmentTypes;