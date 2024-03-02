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
      isEnabled: id !== null,
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

export function useGetSubjectList(limit, page, search) {
  return useQuery(
    ['subjects-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return subjects.getSubjects({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        newData.push({ id: null, value: null, text: 'Select a class', rank: null });
        data?.forEach((item) => {
          newData.push({ id: item.id, value: item.id, text: item.name, rank: item.class_level});
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
        store.dispatch(setAlert(true, 'Teacher assigned successful', 'success', 'You have successfully assigned teacher to class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useDeleteSubClass() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return subjects.deleteSubClass(payload);
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

export function useRemoveTeacherFromClass() {
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




