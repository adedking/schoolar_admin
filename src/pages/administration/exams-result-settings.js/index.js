/* eslint-disable no-unused-vars */
import React, { useState, lazy, Suspense } from 'react';
import DashboardLayout from '../../../components/layouts/dashboard';
import TabView from '../../../components/tabs';
import SubLoader from '../../../components/sub-loader';

const GradingSystem = lazy(() => import('./grading-system'));
const AssessmentTypes = lazy(() => import('./assessment-types'));
const PromotionCriteria = lazy(() => import('./promotion-criteria'));
const PromotionCriteriaModal = lazy(() => import('./sub-components/modal/promotion-criteria'));

const ExamsResultPage = () => {
    const [showPromotionCriteria, setShowPromotionCriteria] = useState(false)
    const [promotionCriteriaData, setPromotionCriteriaData] = useState(null)
    const tabs = [
        {
            title: 'Grading System',
            content: <Suspense fallback = {<SubLoader />} ><GradingSystem  /></Suspense>,
        },
        {
            title: 'Assessment Types',
            content: <Suspense fallback = {<SubLoader />} ><AssessmentTypes /></Suspense>
        },
        {
            title: 'Promotion Criteria',
            content: <Suspense fallback = {<SubLoader />} ><PromotionCriteria setShowPromotionCriteria={setShowPromotionCriteria} setPromotionCriteriaData={setPromotionCriteriaData}  /></Suspense>
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