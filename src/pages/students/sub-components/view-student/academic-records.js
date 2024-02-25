import React from 'react';
// import { useGetStudent } from '../../../../redux/students/hook';
// import { useParams } from 'react-router-dom';

const StudentAcademicRecords = () => {

    // const {id} = useParams();
    // const { data: student } = useGetStudent(id);
    // console.log(student)
    return (
        <div className='flex flex-col gap-4'>
            <div className='text-[20px] py-4'>
                Academic Records
            </div>
            <hr className='divider' />
        </div>
    );
};

export default StudentAcademicRecords;