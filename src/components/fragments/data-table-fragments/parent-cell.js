import React from 'react';
import studentPix from '../../../assets/svg/student.svg';

export const ParentCell = ({guardian_info}) => {
  return (
    <div  className={'flex flex-row text-[13px] items-center justify-center w-[200px] rounded-sm px-2 py-1 h-full'}>
      <div  className={'flex flex-row gap-3 text-[13px] items-center w-full rounded-sm border-4 min-h-[50px] !text-parent-thick bg-parent-background px-2 py-2 !h-full'}>
        {guardian_info && guardian_info.length > 0 ?
        <>
          <div className='flex items-center justify-start'>
            <img src={studentPix} alt='parent_image' />
          </div>
          <div className='flex flex-col w-3/4 text-[12px] font-semibold'>
              <span>{guardian_info[0]?.first_name + ' ' + guardian_info[0]?.last_name}</span>
              <span className='text-[12px]'>{guardian_info[0].mobile}</span>
          </div>
        </>
        :
        '-'
        }
      </div>
    </div>
  );
};