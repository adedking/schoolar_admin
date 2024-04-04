import React from 'react';
import { useGetStudent } from '../../../../redux/students/hook';
import { useParams } from 'react-router-dom';
import AppButton from '../../../../components/app-button';
import { ArrowRight, OrderDetails} from '@carbon/icons-react';
import TeachersCard from '../../../../components/teachers-card';

const SubjectTeachers = ({setShowAssignTeacherToSubject}) => {
    const {id} = useParams();
    const { data: teachers } = useGetStudent(id);
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex w-full justify-between text-[20px] py-2 pb-4 items-center'>
                <span>
                    Subject Teachers
                </span>
                {teachers && teachers.length > 0 ?
                <AppButton
                    text={'Assign Teacher'}
                    kind={'primary'}
                    action={() => {
                        setShowAssignTeacherToSubject(true)
                    }}
                    renderIcon={ArrowRight} 
                />
                : null }
            </div>
            <hr className='divider' />
            {teachers && teachers.length > 0 ?
            <div className='grid grid-cols-2'>
                {teachers.map((teacher, index) => (
                    <TeachersCard key={index} teacher={teacher}/>
                ))}
            </div>
            :
            <div className='flex flex-col p-4 !px-2 md:min-h-[350px] w-full bg-background gap-3 justify-center items-start -mt-8'>
                <div>
                    <OrderDetails width={80} height={120} className='text-primary'/>
                </div>
                <div className='text-[18px] px-3'>
                    {'No Teacher Assigned Yet'}
                </div>
                <div className='text-[12px] font-normal max-w-[400px] px-3'>
                    {'Click the button below to add a teacher to this subject'}
                </div>
                <div className='flex px-3'>
                    <AppButton
                        text={'Assign Teacher'}
                        kind={'primary'}
                        action={() => {
                            setShowAssignTeacherToSubject(true)
                        }}
                        renderIcon={ArrowRight} 
                    />
                </div>
            </div>
            }
        </div>
    );
};

export default SubjectTeachers;