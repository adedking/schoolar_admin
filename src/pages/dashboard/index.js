import React from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/dataTable';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { ComboBox } from '@carbon/react';
// import { StackedAreaChart } from '@carbon/charts-react'
// import '@carbon/charts/styles.css'

const DashboardPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Teachers', value: 80},
           { title: 'Students', value: '1,230'},
           { title: 'Parents', value: 40},
        ]
    }

    const data = {
        data: [
        {
            id: '1',
            first_name: 'Adedokun',
            last_name: 'Agunbiade',
            full_name: 'Adedokun Agunbiade',
            class: 'SS3',
            grade: '99%',
        },
        {
            id: '2',
            first_name: 'Oladotun',
            last_name: 'Aboaba',
            full_name: 'Oladotun Aboaba',
            class: 'SS3',
            grade: '99%',
        },
        {
            id: '3',
            first_name: 'Omotolani',
            last_name: 'Olurotimi',
            full_name: 'Omotolani Olurotimi',
            class: 'SS3',
            grade: '99%',
        },
    ]};

    const tableConfig = [
        {
            key: 'first_name',
            header: 'First Name',
        },
        {
            key: 'last_name',
            header: 'Last Name',
        },
        {
            key: 'class',
            header: 'Class',
        },
        {
            key: 'grade',
            header: 'Grade',
        },
    ];

    const mobileTableHeader = {
        main:[
            {
                key: 'full_name',
                header: 'Student Name',
            },
            {
                key: 'email',
                header: 'Email',
            },
        ],
        full: [
            {
                key: 'first_name',
                header: 'First Name',
            },
            {
                key: 'last_name',
                header: 'Last Name',
            },
            {
                key: 'class',
                header: 'Class',
            },
            {
                key: 'grade',
                header: 'Grade',
            },
        ]
    };

    const items = [
        {
            id: 'option-0',
            text: 'Choose a class'
        }, 
        {
            id: 'option-1',
            text: 'SS3 - A'
        }, 
        {
            id: 'option-2',
            text: 'SS2 - B'
        }, 
        {
            id: 'option-2',
            text: 'SS2 - C'
        },
        {
            id: 'option-2',
            text: 'SS2 - B'
        },
    ];

    return (
        <React.Fragment>
            <DashboardLayout>
                <div className='flex flex-col items-center jusify-center min-w-full max-w-full gap-4 mb-3'>
                    <WidgetCard 
                        cardData={cardData}
                    />
                    <div className='flex flex-col bg-background w-full md:h-[386px] h-fit p-3 gap-3'>
                        <div className='flex md:flex-row flex-col justify-between min-h-[56px] md:items-center w-full gap-3'>
                            <div className='md:min-w-1/3 w-full text-[18px]'>Class statistics</div>
                            <div className='flex md:flex-row flex-col gap-4 md:min-w-2/3 w-full justify-end'>
                            <ComboBox
                                onChange={() => {}} 
                                id="assigned_teacher" 
                                items={items} 
                                downshiftProps={{
                                onStateChange: () => {
                                    // console.log('the state has changed');
                                }
                                }} 
                                placeholder='Select class'
                                itemToString={item => item ? item.text : ''} 
                                titleText="Class"
                                size="sm" 
                                className='!w-[300px] text-[13px]'
                            />
                                {/* <Dropdown id="default" titleText="Class" initialSelectedItem={items[0]} size="sm" label="Class" items={items} itemToString={item => item ? item.text : ''} className='md:w-[288px] w-full' /> */}
                                <DatePicker datePickerType="range">
                                    <DatePickerInput id="date-picker-input-id-start" placeholder="mm/dd/yyyy" labelText="From" size="sm" />
                                    <DatePickerInput id="date-picker-input-id-finish" placeholder="mm/dd/yyyy" labelText="To" size="sm" />
                                </DatePicker>
                            </div>
                        </div>
                        <div>
                            Chart here
                            {/* <StackedAreaChart 
                                data={chartData} 
                                options={options}
                            ></ StackedAreaChart> */}
                        </div>
                    </div>
                    <div className='min-w-full max-w-full bg-background rounded-sm'>
                        <AppDataTable 
                            showToolBar={false}
                            title={'Top performing students'}
                            check={false}
                            tableHeader={tableConfig}
                            mobileTableHeader={mobileTableHeader}
                            data={data}
                        />
                    </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
        
    );
};

export default DashboardPage;