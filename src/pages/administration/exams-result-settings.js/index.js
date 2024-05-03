/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import TabView from '../../../components/tabs';
import GradingSystem from './grading-system';
import AssessmentTypes from './assessment-types';
import PromotionCriteria from './promotion-criteria';
import PromotionCriteriaModal from './sub-components/modal/promotion-criteria';

const ExamsResultPage = () => {

    const [showPromotionCriteria, setShowPromotionCriteria] = useState(false)
    const [promotionCriteriaData, setPromotionCriteriaData] = useState(null)
    const tabs = [
        {
            title: 'Grading System',
            content: <GradingSystem  />,
        },
        {
            title: 'Assessment Types',
            content: <AssessmentTypes />
        },
        {
            title: 'Promotion Criteria',
            content: <PromotionCriteria setShowPromotionCriteria={setShowPromotionCriteria} setPromotionCriteriaData={setPromotionCriteriaData}  />
        },
    ];

    

    return (
        <React.Fragment>
            {
                showPromotionCriteria && (
                    <PromotionCriteriaModal
                        promotionCriteriaData={promotionCriteriaData}
                        isOpen={showPromotionCriteria}
                        setShowPromotionCriteria={setShowPromotionCriteria}
                        closeModal={()=> setShowPromotionCriteria(false)}
                    />
                )
            }
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex flex-col items-center jusify-center w-full gap-4'>
                    <div className='flex flex-col px-4 h-[76px] w-full justify-center gap-1 bg-background'>
                        <div className='text-[18px] font-semibold'>
                            Exams and Result Configuration
                        </div>
                        <div className='text-[13px] font-light'>
                            Manage school's exams and results configurations
                        </div>
                    </div>
                    <TabView componentTabs={tabs}/>
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default ExamsResultPage;