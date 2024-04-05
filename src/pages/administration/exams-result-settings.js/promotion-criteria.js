import React from 'react';
import { useGetSubClasses } from '../../../redux/classes/hook';
import PromotionCriteriaDataCard from './sub-components/promotion-criteria-cards';

const PromotionCriteria = ({setShowPromotionCriteria, setPromotionCriteriaData}) => {

    const { data: subClasses, isLoading: subClassesLoading } = useGetSubClasses();
    

    return (
        <React.Fragment>
            <div className='flex flex-col gap-4 -my-4'>
                <PromotionCriteriaDataCard
                    title={'Promotion Criteria'}
                    description={'Manage promotion criteria per class'}
                    data={subClasses}
                    loading={subClassesLoading}
                    setShowPromotionCriteria={setShowPromotionCriteria}
                    setPromotionCriteriaData={setPromotionCriteriaData}
                />
            </div>
        </React.Fragment>
    );
};

export default PromotionCriteria;