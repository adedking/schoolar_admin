import React, { useState } from 'react';
import { useGetSubClasses } from '../../../redux/classes/hook';
import PromotionCriteriaDataCard from '../../../components/promotion-criteria-cards';

const PromotionCriteria = () => {

    const { data: subClasses, isLoading: subClassesLoading } = useGetSubClasses();
    const [showPromotionCriteria, setShowPromotionCriteria] = useState(false)

    return (
        <div className='flex flex-col gap-4 -my-4'>
            <PromotionCriteriaDataCard
                title={'Promotion Criteria'}
                description={'Manage promotion criteria per class'}
                data={subClasses}
                loading={subClassesLoading}
                setShowPromotionCriteria={setShowPromotionCriteria}
            />
        </div>
    );
};

export default PromotionCriteria;