import { store } from '..';
import { setAlert, setIsLoading } from '../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { students } from '../../api/students';

export function useGetStudents( limit, page, statusFilter, search ) {
  return useQuery(
    ['students', { limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return students.getStudents({ limit, page, statusFilter, search });
    },
    {
      select: (data) => {
        data?.data?.forEach((student) => {
          student.class = `${student.main_class} (${student.sub_class})`
        });
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}


export function useGetStudent(id) {
  return useQuery(
    ['student', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return students.getStudent(id);
    },
    {
      isEnabled: id !== null,
      select: (data) => {
        data?.parents?.forEach((parent) => {
          parent.full_address = `${parent.address} ${parent.lga}, ${parent.state}, ${parent.country}`
        });
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
      // keepPreviousData: true
    },
  );
}

export function useAddStudent() {
  return useMutation(
    (payload) => {
      return students.addStudent(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('students');
        store.dispatch(setAlert(true, 'Add Student Successful', 'success', 'You have successfully added a student'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAddMultipleStudents() {
  return useMutation(
    (payload) => {
      return students.addMultipleStudents(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('students');
        store.dispatch(setAlert(true, 'Add Teacher Successful', 'success', 'You have successfully added students'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAddStudentRecords() {
  return useMutation(
    (payload) => {
      return students.addStudentRecords(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries('student');
        queryClient.invalidateQueries('students-list');
        store.dispatch(setAlert(true, 'Add Student Record Successful', 'success', 'You have successfully added student records'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAddStudentParentsNew() {
  return useMutation(
    (payload) => {
      return students.addStudentParentsNew(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries('parents');
        queryClient.invalidateQueries('student');
        queryClient.invalidateQueries('students-list');
        store.dispatch(setAlert(true, 'Add student parent successful', 'success', 'You have successfully added student parent'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAddStudentParentsOld() {
  return useMutation(
    (payload) => {
      return students.addStudentParentsExisting(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries('student');
        queryClient.invalidateQueries('students-list');
        store.dispatch(setAlert(true, 'Add Student Record Successful', 'success', 'You have successfully added student records'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useUpdateStudent() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return students.updateStudent(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries('student');
        queryClient.invalidateQueries('students-list');
        store.dispatch(setAlert(true, 'success', 'Student updated successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useDeleteStudent() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return students.deleteStudent(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries('student');
        queryClient.invalidateQueries('students-list');
        store.dispatch(setAlert(true, 'success', 'Student information deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetStudentsList(limit, page, search) {
  return useQuery(
    ['students-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return students.getStudents({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        data?.data.forEach((item) => {
          newData.push({ id: item.id, text: item.first_name + ' ' + item.last_name+ ', ' + item.mobile });
        });
        return newData;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
      // keepPreviousData: true
    },
  );
}