
export const APP_NAME = 'Ropay';
export const PAGINATION_DEFAULT = {
  limit: 10,
  page: 1,
  statusFilter: -1,
  type: '',
  pageSizes: [10, 20, 30, 40, 50, 100],
};

//employees
export const employeeStatusConfig = [
  {
    label: 'Inactive',
    value: 0,
    color: 'red',
  },
  {
    label: 'Active',
    value: 1,
    color: 'green',
  },
  {
    label: 'Pending',
    value: 2,
    color: 'orange',
  },
  // {
  //   label: 'Deleted',
  //   value: 3,
  //   color: 'red',
  // },
  {
    label: 'Awaiting Activation',
    value: 4,
    color: 'orange',
  },
  {
    label: 'Pre Registered',
    value: 5,
    color: 'orange',
  },
];

//employees
export const employeeHrStatusConfig = [
  {
    label: 'Not Subscribed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Subscribed',
    value: 1,
    color: 'green',
  },
];

//query
export const queryStatusConfig = [
  {
    label: 'Not Resolved',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Resolved',
    value: 1,
    color: 'green',
  },
];

//Leaves
export const leaveStatusConfig = [
  {
    label: 'Pending',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Approved',
    value: 1,
    color: 'green',
  },
  {
    label: 'Declined',
    value: 2,
    color: 'red',
  },
];

//Recruitment Status
export const recruitmentStatusConfig = [
  {
    label: 'Application Closed',
    value: 0,
    color: 'red',
  },
  {
    label: 'Application Open',
    value: 1,
    color: 'green',
  },
];

export const HMOstatusConfig = [
  {
    label: 'Pending',
    color: 'red',
    value: 0,
  },
  {
    label: 'Active',
    color: 'green',
    value: 1,
  },
  {
    label: 'Pending',
    color: 'red',
    value: 2,
  },
  {
    label: 'Awating Activatiion',
    color: 'orange',
    value: 3,
  },
];

//exit Status
export const exitStatusConfig = [
  {
    label: 'Not Reviewed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Reviewed',
    value: 1,
    color: 'green',
  },
];

export const ExitEmployeeStatusConfig = [
  {
    label: 'Not Completed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Completed',
    value: 1,
    color: 'green',
  },
];

export const TrainingStatusConfig = [
  {
    label: 'Not Completed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Completed',
    value: 1,
    color: 'green',
  },
];

export const TrainerStatusConfig = [
  {
    label: 'Inactive',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Active',
    value: 1,
    color: 'green',
  },
];

export const TicketStatusConfig = [
  {
      label: 'Pending',
      color: 'red',
      value: 0,
  },
  {
      label: 'Resolved',
      color: 'green',
      value: 1,
  },
  {
      label: 'In Progress',
      color: 'orange',
      value: 2,
  },
];

//Onboarding Status
export const onboardingStatusConfig = [
  {
    label: 'Not Reviewed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Reviewed',
    value: 1,
    color: 'green',
  },
];

export const onboardingEmployeeStatusConfig = [
  {
    label: 'Not Completed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Completed',
    value: 1,
    color: 'green',
  },
];

//Training Status
export const trainingStatusConfig = [
  {
    label: 'Not Completed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Completed',
    value: 1,
    color: 'green',
  },
];

//employees
export const recruitmentApplicationStatusConfig = [
  {
    label: 'Not Reviewed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Accepted',
    value: 1,
    color: 'green',
  },
  {
    label: 'Rejected',
    value: 2,
    color: 'red',
  },
  {
    label: 'Pending Acceptance',
    value: 3,
    color: 'orange',
  },
  {
    label: 'Filtered',
    value: 4,
    color: 'orange',
  },
];

export const performanceSatusConfig = [
  {
    label: 'Not Reviewed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Reviewed',
    value: 1,
    color: 'green',
  },
];

//Branch
export const branchStatusConfig = [
  {
    label: 'Inactive',
    value: 0,
    color: 'red',
  },
  {
    label: 'Active',
    value: 1,
    color: 'green',
  },
  {
    label: 'Closed',
    value: 2,
    color: 'orange',
  },
];

//Attendance
export const attendanceStatusConfig = [
  {
    label: 'Absent',
    value: 0,
    color: 'red',
  },
  {
    label: 'Present',
    value: 1,
    color: 'green',
  },
];

//Attendance Punctuality
export const attendancePunctualityStatusConfig = [
  {
    label: '=',
    value: 0,
    color: 'red',
  },
  {
    label: 'On Time',
    value: 1,
    color: 'green',
  },
  {
    label: 'Early',
    value: 2,
    color: 'green',
  },
  {
    label: 'Late',
    value: 3,
    color: 'orange',
  },
];

//employees
export const vendorStatusConfig = [
  {
    label: 'Inactive',
    value: 0,
    color: 'red',
  },
  {
    label: 'Active',
    value: 1,
    color: 'green',
  },
  {
    label: 'Pending',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Deleted',
    value: 3,
    color: 'red',
  },
];

export const customerStatusConfig = [
  {
    label: 'Inactive',
    value: 0,
    color: 'red',
  },
  {
    label: 'Active',
    value: 1,
    color: 'green',
  },
  {
    label: 'Pending',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Deleted',
    value: 3,
    color: 'red',
  },
];
export const invoiceStatusConfig = [
  {
    label: 'Unpaid',
    value: 0,
    color: 'red',
  },
  {
    label: 'Paid',
    value: 1,
    color: 'green',
  },
  {
    label: 'Partial Payment',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Deleted',
    value: 3,
    color: 'red',
  },
  {
    label: 'Cancelled',
    value: 4,
    color: 'orange',
  },
];

export const recurringInvoiceStatusConfig = [
  {
    label: 'Pending',
    value: 0,
    color: 'red',
  },
  {
    label: 'Completed',
    value: 1,
    color: 'green',
  },
  {
    label: 'On-going',
    value: 2,
    color: 'orange',
  },
];

export const invoiceDueStatusConfig = [
  {
    label: 'Not due',
    value: 0,
    color: 'green',
  },
  {
    label: '------',
    value: 1,
    color: 'green',
  },
  {
    label: 'Due',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Overdue ',
    value: 3,
    color: 'red',
  },
];

export const purchaseOrderStatusConfig = [
  {
    label: 'Pending',
    value: 0,
    color: 'red',
  },
  {
    label: 'Paid/Delivered',
    value: 1,
    color: 'green',
  },
  {
    label: 'Shipping',
    value: 2,
    color: 'orange',
  },
];

export const invoiceReceivedStatus = [
  {
    label: 'Not Paid',
    value: 0,
    color: 'red',
  },
  {
    label: 'Paid',
    value: 1,
    color: 'green',
  },
  {
    label: 'Part Paid',
    value: 2,
    color: 'orange',
  },
];


export const reImbursementStatusConfig = [
  {
    label: 'Pending',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Paid',
    value: 1,
    color: 'green',
  },
  {
    label: 'Declined',
    value: 2,
    color: 'red',
  },
  {
    label: 'Payment Initiated',
    value: 3,
    color: 'orange',
  },
];

export const PerformanceEvaluationStatusConfig = [
  {
    label: 'Not Reviewed',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Reviewed',
    value: 1,
    color: 'green',
  },
];

export const reimbursementApplicationStatusConfig = [
  {
    label: 'Pending',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Approved',
    value: 1,
    color: 'green',
  },
  {
    label: 'Declined',
    value: 2,
    color: 'red',
  },
  {
    label: 'Payment Initiated',
    value: 3,
    color: 'orange',
  },
];

export const bonusesStatusConfig = [
  {
    label: 'Not Applied',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Applied',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Applied',
    value: 2,
    color: 'orange',
  },
];

export const probationStatusConfig = [
  {
    label: 'Pending',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Confirmed',
    value: 1,
    color: 'green',
  },
  {
    label: 'Ongoing',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Terminated',
    value: 3,
    color: 'red',
  },
];

export const pipStatusConfig = [
  {
    label: 'Pending',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Re-instated',
    value: 1,
    color: 'green',
  },
  {
    label: 'On-going',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Terminated',
    value: 3,
    color: 'red',
  },
];

export const salaryReviewStatusConfig = [
  {
    label: 'Not Applied',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Applied',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Applied',
    value: 2,
    color: 'orange',
  },
];

export const otherStatutoryAllowancesStatusConfig = [
  {
    label: 'Not Applied',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Applied',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Applied',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Recurring',
    value: 3,
    color: 'orange',
  },
];

export const salaryAdvanceStatusConfig = [
  {
    label: 'Not Deducted',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Deducted',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Deducted',
    value: 2,
    color: 'orange',
  },
];

export const OvertimeStatusConfig = [
  {
    label: 'Not Applied',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Applied',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Applied',
    value: 2,
    color: 'orange',
  },
];

export const OtherDeductionStatusConfig = [
  {
    label: 'Not Deducted',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Deducted',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Deducted',
    value: 2,
    color: 'orange',
  },
];

export const salaryAdvanceApplicationStatusConfig = [
  {
    label: 'Pending',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Approved',
    value: 1,
    color: 'green',
  },
  {
    label: 'Declined',
    value: 2,
    color: 'red',
  },
  {
    label: 'Payment Initiated',
    value: 3,
    color: 'orange',
  },
  {
    label: 'Approved And Paid',
    value: 4,
    color: 'green',
  },
];


export const basicStatusConfig = [
  {
    label: 'In Progress',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Completed',
    value: 1,
    color: 'green',
  },
  {
    label: 'Awaiting Approval',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Computing...',
    value: 3,
    color: 'orange',
  },
];

export const pensionStatusConfig = [
  {
    label: 'Not Remmitted',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Remitted',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Remmitted',
    value: 2,
    color: 'orange',
  },
  {
    label: 'Payment Initiated',
    value: 3,
    color: 'orange',
  },
  {
    label: 'Awaiting Remittance',
    value: 4,
    color: 'orange',
  },
  
];

export const advancedStatusConfig = [
  {
    label: 'In Progress',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Completed',
    value: 1,
    color: 'green',
  },
];

export const suspensionStatusConfig = [
  {
    label: 'Not Applied',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Applied',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Applied',
    value: 2,
    color: 'orange',
  },
];

export const payrollHistoryStatusConfig = [
  {
    label: 'Processing',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Successful',
    value: 1,
    color: 'green',
  },
  {
    label: 'Failed',
    value: 2,
    color: 'red',
  },
  {
    label: 'Failed: Retried',
    value: 3,
    color: 'red',
  },
];

export const invoiceRecievedStatusConfig = [
  {
    label: 'Processing',
    value: 0,
    color: 'orange',
  },
  {
    label: 'Successful',
    value: 1,
    color: 'green',
  },
  {
    label: 'Failed',
    value: 2,
    color: 'red',
  },
  {
    label: 'Initiated',
    value: 3,
    color: 'orange',
  },
];

export const StatutoryConfig = [
  {
    label: 'Paid & Filed',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Paid ',
    value: 2,
    color: 'orange',
  },
  
];

export const airtimeStatusConfig = [
  {
    label: 'Paid',
    value: 1,
    color: 'green',
  },
  {
    label: 'Not Paid',
    value: 2,
    color: 'orange',
  },
  
];
