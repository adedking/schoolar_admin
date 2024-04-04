import React, { useState } from 'react';
import { Form, Modal, Select, SelectItem, TextInput, ComboBox } from 'carbon-components-react';
import { checkError } from '../../../utils/functions';
import { useForm } from 'react-hook-form';

const GradingSystem = () => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const items = [
        { id: 'Excellent', text: 'Excellent' },
        { id: 'Very Good', text: 'Very Good' },
        { id: 'Average', text: 'Average' },
        { id: 'Credit', text: 'Credit' },
        { id: 'Pass', text: 'Pass' },
        { id: 'Fail', text: 'Fail' },
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
    const gradeOptions = [
        {
            label: 'A+',
            text: 'A+',
        },
        {
            label: 'A',
            text: 'A',
        },
        {
            label: 'B',
            text: 'B',
        },
        {
            label: 'C',
            text: 'C',
        },
        {
            label: 'D',
            text: 'D',
        },
        {
            label: 'E',
            text: 'E',
        },
        {
            label: 'F',
            text: 'F',
        },
    ]

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

    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[15px] py-2 pt-4'>
                Grading System
            </div>
            <hr className='divider' />
            <div className='flex flex-col gap-2'>
                <div className='flex gap-4 w-full p-2 bg-white'>
                    <div className='w-1/4'>
                        <ComboBox 
                            id="class"
                            items={items ? items : []} 
                            value={inputValue}
                            onChange={handleSelectItem}
                            onInput={(e) => {
                                setInputValue(e?.selectedItem?.text)
                            }}
                            placeholder="Select or type an a remark"
                            itemToString={item => item ? item.text : ''} 
                            titleText="Search and select a remark"
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
                            labelText="Minimum Score"
                            placeholder="Enter Grade Remark"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
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
                            labelText="Maximum Score"
                            placeholder="Enter Grade Remark"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
                        />
                    </div>
                    <div className='w-1/4'>
                        <Select
                            id="grade"
                            name='grade'
                            labelText="Grade"
                            value={form.grade}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'grade', setError, clearErrors, handleChange)
                            }}
                        >
                            {gradeOptions.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                    text={item.text}
                                />
                            ))}
                        </Select>
                    </div>
                </div>
                <hr className='divider mt-2' />
                <div className='flex gap-4 w-full p-2 bg-white'>
                    <div className='w-1/4'>
                        <TextInput
                            className='min-w-full'
                            kind={'text'}
                            name={'book_name'}
                            id="subject_name"
                            required
                            invalidText="Please enter a valid book name"
                            labelText="Grade Remark"
                            placeholder="Enter Grade Remark"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
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
                            labelText="Minimum Score"
                            placeholder="Enter Grade Remark"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
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
                            labelText="Maximum Score"
                            placeholder="Enter Grade Remark"
                            // value={name}
                            // onChange={(e) => {
                            //     setName(e.target.value)
                            // }}
                        />
                    </div>
                    <div className='w-1/4'>
                        <Select
                            id="Grade Code"
                            name='grade_code'
                            labelText="Weight Measurement"
                            value={form.weight_measurement}
                            onChange={(e) => {
                                checkError(true, e, e.target.value, 'weight_measurement', setError, clearErrors, handleChange)
                            }}
                        >
                            {gradeOptions.map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.value}
                                    text={item.text}
                                />
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GradingSystem;