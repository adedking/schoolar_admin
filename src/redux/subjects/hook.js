import { store } from '..';
import { setAlert, setIsLoading } from '../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { subjects } from '../../api/subjects';

export function useGetSubjects() {
  return useQuery(
    ['subjects', {}], 
    () => {
      store.dispatch(setIsLoading(true));
      return subjects.getClasses();
    },
    {
      select: (data) => {
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
      // keepPreviousData: true
    },
  );
}

export function useGetSubject(id) {
  return useQuery(
    ['subject', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return subjects.getSubject(id);
    },
    {
      enabled: id !== null,
      select: (data) => {
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
      // keepPreviousData: true
    },
  );
}

export function useGetSubjectList(sub_class_id, limit, page) {
  return useQuery(
    ['subjects-list', { sub_class_id, limit, page }],
    () => {
      store.dispatch(setIsLoading(true));
      return subjects.getSubjects({
        sub_class_id,
        limit,
        page,
      });
    },
    {
      enabled: sub_class_id !== null,
      select: (data) => {
        let newData = [];
        data?.data.forEach((item) => {
          newData.push({ id: item.id, value: item.id, text: item.name});
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

export function useAddSubject() {
  return useMutation(
    (payload) => {
      return subjects.addClass(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('subjects');
        queryClient.invalidateQueries('subject');
        queryClient.invalidateQueries('subjects-list');
        store.dispatch(setAlert(true, 'Class added successful', 'success', 'You have successfully added the class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAssignTeacherToSubject() {
  return useMutation(
    (payload) => {
      return subjects.assignTeacherToSubject(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('subjects');
        queryClient.invalidateQueries('subject');
        store.dispatch(setAlert(true, 'Teacher assigned successful', 'success', 'You have successfully assigned teacher to subject'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useDeleteSubject() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return subjects.deleteSubject(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('subjects');
        queryClient.invalidateQueries('subject');
        queryClient.invalidateQueries('subjects-list');
        store.dispatch(setAlert(true, 'success', 'Class deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useRemoveTeacherFromSubject() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return subjects.removeTeacherFromClass(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('subjects');
        queryClient.invalidateQueries('subject');
        queryClient.invalidateQueries('subjects-list');
        store.dispatch(setAlert(true, 'success', 'Class deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAddSubjectBook() {
  return useMutation(
    (payload) => {
      return subjects.addSubjectBook(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('subjects');
        queryClient.invalidateQueries('subject');
        queryClient.invalidateQueries('subjects-list');
        store.dispatch(setAlert(true, 'Class added successful', 'success', 'You have successfully added the class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetAttendanceBySubject( id, limit, page, statusFilter, search ) {
  return useQuery(
    ['attendance-by-subject', { id, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return subjects.getAttendanceBySubject({ id, limit, page, statusFilter, search });
    },
    {
      select: (data) => {
        data?.data?.forEach((subject) => {
          subject.subject_type = subject.compulsory === 1 ? 'Compulsory' : 'Optional'
        });
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useMarkSubjectAttendance() {
  return useMutation(
    (payload) => {
      return subjects.markSubjectAttendance(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('subjects');
        queryClient.invalidateQueries('subject');
        queryClient.invalidateQueries('subjects-list');
        store.dispatch(setAlert(true, 'Class added successful', 'success', response.message));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

