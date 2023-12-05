import { store } from '..';
import { setAlert, setIsLoading } from '../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { teachers } from '../../api/teachers';
import { queryClient } from '../..';

export function useGetTeachers( limit, page, statusFilter, search ) {
  return useQuery(
    ['teachers', { limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return teachers.getTeachers({ limit, page, statusFilter, search });
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

export function useAddTeacher() {
  return useMutation(
    (payload) => {
      return teachers.addTeacher(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('teachers');
        store.dispatch(setAlert(true, 'Add Teacher Successful', 'success', 'You have successfully added teacher'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetTeacher(id) {
  return useQuery(
    ['teacher', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return teachers.getTeacher(id);
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

export function useGetTeachersList(limit, page, search) {
  return useQuery(
    ['teachers-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return teachers.getTeachers({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        newData.push({ id: null, text: 'Select a teacher', value: null });
        data?.forEach((item) => {
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