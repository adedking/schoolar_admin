import React from 'react';
import studentPix from '../../../assets/svg/student.svg';
import { TableCell } from 'carbon-components-react';

export const TeacherCell = ({teacher_info, type='primary'}) => {
  return (
    <TableCell  className={'text-[13px] items-center justify-center rounded-sm px-2 py-1 h-full '}>
      {type !== 'primary' ?
      <div  className={'flex flex-row gap-3 text-[13px] items-center w-full rounded-sm border-2 border-green-700 min-h-[45px] !text-green-700 bg-green-100 px-2 py-2 !h-full'}>
        {teacher_info && teacher_info.length > 0 ?
        <>
          <div className='flex items-center justify-start'>
            <img src={studentPix} alt='parent_image' />
          </div>
          <div className='flex flex-col w-3/4 text-[12px] font-semibold'>
              <span>{teacher_info[0]?.first_name + ' ' + teacher_info[0]?.last_name}</span>
              <span className='text-[12px]'>{teacher_info[0].mobile}</span>
          </div>
        </>
        :
        <span>-</span>
        }
      </div>
      :
      <div  className={'flex flex-row gap-3 text-[13px] items-center w-full rounded-sm border-2 !border-parent-thick min-h-[45px] !text-parent-thick bg-parent-background px-2 py-2 !h-full'}>
        {teacher_info && teacher_info.length > 0 ?
        <>
          <div className='flex items-center justify-start'>
            <img src={studentPix} alt='parent_image' />
          </div>
          <div className='flex flex-col w-3/4 text-[12px] font-semibold'>
              <span>{teacher_info[0]?.first_name + ' ' + teacher_info[0]?.last_name}</span>
              <span className='text-[12px]'>{teacher_info[0].mobile}</span>
          </div>
        </>
        :
        <span>-</span>
        }
      </div>
      }
    </TableCell>
  );
};