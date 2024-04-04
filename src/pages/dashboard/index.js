import React from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import WidgetCard from '../../components/widget';
import AppDataTable from '../../components/data-table';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { ComboBox } from '@carbon/react';
import { StackedAreaChart } from '@carbon/charts-react'
import "@carbon/charts/styles/styles.scss";
import { useGetSubClassesList } from '../../redux/classes/hook';

const DashboardPage = () => {

    const cardData = {
        columns: 3,
        items: [
           { title: 'Teachers', value: 80},
           { title: 'Students', value: '1,230'},
           { title: 'Parents', value: 40},
        ]
    }

    // const [startDate, setStartDate] = useState()
    // const [endDate, setEndDate] = useState()

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

    const chartData = {
		data: [
            {
                "group": "Student",
                "date": "2019-01-01T00:00:00.000Z",
                "value": 500,
            },
            {
                "group": "Student",
                "date": "2019-01-05T00:00:00.000Z",
                "value": 850
            },
            {
                "group": "Student",
                "date": "2019-01-08T00:00:00.000Z",
                "value": 600
            },
            {
                "group": "Student",
                "date": "2019-01-13T00:00:00.000Z",
                "value": 1000
            },
            {
                "group": "Student",
                "date": "2019-01-17T00:00:00.000Z",
                "value": 743
            },
            {
                "group": "Student",
                "date": "2019-01-21T00:00:00.000Z",
                "value": 1205
            },
            {
                "group": "Student",
                "date": "2019-01-25T00:00:00.000Z",
                "value": 950
            },
            {
                "group": "Student",
                "date": "2019-02-03T00:00:00.000Z",
                "value": 730
            },
        ],
		options: {
            "axes": {
                "left": {
                    "stacked": true,
                    "scaleType": "linear",
                    "mapsTo": "value",
                },
                "bottom": {
                    "scaleType": "time",
                    "mapsTo": "date",
                },
            },
            "curve": "curveMonotoneX",
            "height": "400px",
            "color": {
                scale: {
                    Student: "#a6c8ff"
                }
            },
            "grid": {
                "left": false,
                "bottom": false
            }
        }
	};

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

    const { data: classes } = useGetSubClassesList(
        1000,
        1,
    );

    return (
        <React.Fragment>
            <DashboardLayout>
                <div className='flex flex-col items-center jusify-center min-w-full max-w-full gap-4 mb-3'>
                    <WidgetCard 
                        cardData={cardData}
                    />
                    <div className='flex flex-col bg-background w-full min-h-[386px] h-fit p-3 gap-3'>
                        <div className='flex md:flex-row flex-col justify-between min-h-[56px] md:items-center w-full gap-3'>
                            <div className='md:min-w-1/3 w-full text-[18px]'>Class statistics</div>
                            <div className='flex md:flex-row flex-col gap-4 md:min-w-2/3 w-full justify-end'>
                                <ComboBox 
                                    id="class"
                                    items={classes ? classes : []} 
                                    onChange={(e) => {
                                        // if (e?.selectedItem?.id) {
                                        //     setClassName(e?.selectedItem?.text)
                                        //     setClassRank(e?.selectedItem?.rank)
                                        //     setClassId(e?.selectedItem?.id)
                                        // } else {
                                        //     setClassName('')
                                        //     setClassRank(null)
                                        //     setClassId(null)
                                        // }
                                    }}
                                    size='sm'
                                    placeholder='Select Class'
                                    itemToString={item => item ? item.text : ''} 
                                    titleText="Class"
                                />
                                {/* <Dropdown id="default" titleText="Class" initialSelectedItem={items[0]} size="sm" label="Class" items={items} itemToString={item => item ? item.text : ''} className='md:w-[288px] w-full' /> */}
                                <DatePicker datePickerType="range">
                                    <DatePickerInput id="date-picker-input-id-start" placeholder="mm/dd/yyyy" labelText="From" size="sm" />
                                    <DatePickerInput id="date-picker-input-id-finish" placeholder="mm/dd/yyyy" labelText="To" size="sm" />
                                </DatePicker>
                            </div>
                        </div>
                        <div className='px-4'>
                            <StackedAreaChart 
                                data={chartData.data}
                                options={chartData.options}
                            >
                            </ StackedAreaChart>
                            
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