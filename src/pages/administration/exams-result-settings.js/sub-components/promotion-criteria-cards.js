import React from 'react';
import { 
    Loading, 
} from 'carbon-components-react';
import { 
    ArrowRight, 
} from '@carbon/icons-react';
// import { useNavigate } from 'react-router-dom';

const PromotionCriteriaDataCard = ({ 
    data, 
    title, 
    description, 
    loading=false,
    setShowPromotionCriteria
}) => {
    // console.log(data)
    return (
        <React.Fragment>    
            {loading ?
            <div className='flex flex-col p-8 px-16 min-h-[530px] w-full bg-background gap-4 justify-center items-center'>
                <Loading className={''} withOverlay={false} small={false} />
            </div>
            :
            <div className='flex flex-col gap-2 mt-4'>
                <div className='text-[18px]'>{title}</div>
                <div className='text-[13px]'>{description}</div>
                <div className='grid grid-cols-3 gap-5 mt-4'>
                    {data.map(subClassInfo => (
                            <div className='flex flex-col justify-between md:min-w-[33%] w-full h-[180px] bg-white rounded p-3 py-2 hover:shadow-md hover:scale-105 duration-300'>
                                <div className='flex gap-1 items-center md:min-w-[33%] w-full bg-white rounded text-[16px] font-semibold'>
                                    {subClassInfo.class_name} - {subClassInfo.name} 
                                    <span className='flex items-center text-[12px] text-gray-400'>{subClassInfo?.type === 'arts' ? '(Arts)' : subClassInfo?.type === 'commerce' ? '(Commercial)' : subClassInfo?.type === 'sciences' ? '(Sciences)' : null}</span>
                                </div>
                                <div className='flex flex-col gap-3 bg-background border h-fit p-3'>
                                    <div className='flex gap-2 items-center'>
                                        <span className='text-[12px] font-semibold'>Must pass subject count: </span>
                                        <span className='text-[11px]'>5</span>
                                    </div>
                                    <hr className='divider' />
                                    <div className='flex flex-col gap-2 justify-center'>
                                        <span className='text-[12px] font-semibold'>Compulsory Subjects For Promotion:</span>
                                        <span className='text-[11px] bg-white p-2'>Mathematics, English, Physics, Biology</span>
                                    </div>
                                </div>
                                <span
                                    className='flex gap-2 items-center text-primary text-[11px] cursor-pointer max-w-fit hover:underline duration-300'
                                    onClick={() => {
                                        setShowPromotionCriteria(true)
                                    }}
                                >
                                    Update promotion criteria <ArrowRight />
                                </span>
                            </div>
                    ))}  
                </div>
            </div>
            }
        </React.Fragment>
    )
};

export default PromotionCriteriaDataCard;