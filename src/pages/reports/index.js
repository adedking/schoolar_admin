/* eslint-disable no-unused-vars */
import React from 'react';
import DashboardLayout from '../../components/layouts/dashboard';
import ReportCards from '../../components/report-card';

const Reports = () => {

    const sessionActivities = [
      {
        title: 'Attendance Reports',
        description: 'Manage all session terms. Configure term holidays, lecture dates and exam dates',
        link: `/reports/attendance`
      },
      {
        title: 'Examination Reports',
        description: "Manage this academic session's admissions. Configure admissions and create CBT tests for admission candidates",
        link: `/reports/examination`
      },
      {
        title: 'Admission Reports',
        description: 'Manage and view all academic records of students in the academic session',
        link: `/reports/admission`
      },
    ]

    return (
        <React.Fragment>
            <DashboardLayout viewComponent={null} viewTitle={'View student'}>
                <div className='flex flex-col items-center jusify-center min-w-full gap-4'>
                  <div className='w-full flex flex-col gap-4'>
                      <div className='flex items-center justify-between w-full md:gap-0 gap-3 h-[68px] bg-background px-4'>
                          <div className='flex flex-row gap-2'>
                              <span className='text-[15px] font-semibold'>
                                  School Reports
                              </span>
                          </div>
                      </div>
                      <div className='grid md:grid-cols-3 grid-cols-1 gap-4 justify-items-stretch'>
                          {sessionActivities.map((item, index) => (
                              <ReportCards
                                  key={index}
                                  title={item.title}
                                  description={item.description}
                                  link={item.link}
                              />
                          ))}
                      </div>
                  </div>
                </div>
            </DashboardLayout>
        </React.Fragment>
    );
};

export default Reports;