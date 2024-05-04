import React from 'react'
import DashboardLayout from '../../components/layouts/dashboard'
import ChevronSVG from '../../assets/svg/work-in-progress.svg';

function ELearning() {
  return (
    <DashboardLayout>
        <div className='flex flex-col items-center jusify-center w-full mt-12 font-semibold'>
            
            <img src={ChevronSVG} alt='' srcSet='' />
            <span className='font-semibold text-[30px] -mt-8'>Launching Soon...</span>
        </div>
    </DashboardLayout>
  )
}

export default ELearning