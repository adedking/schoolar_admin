import React from 'react';

import { useParams } from 'react-router-dom';
import { useGetSubject } from '../../../../redux/subjects/hook';

const SubjectTeachers = () => {
    const {id} = useParams();
    const { data: subject } = useGetSubject(id);
    
    return (
        <React.Fragment> 
            {subject?.primary_teacher || subject?.support_teacher ?
            <React.Fragment>
                Teachers go here
            </React.Fragment>:
            <React.Fragment>
                No teachers assigned
            </React.Fragment>
            }
            
        </React.Fragment>
    );
};

export default SubjectTeachers;