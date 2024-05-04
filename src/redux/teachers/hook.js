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

export function useAddMultipleTeachers() {
  return useMutation(
    (payload) => {
      return teachers.addMultipleTeacher(payload);
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
        data?.data.forEach((item) => {
          newData.push({ id: item.id, uuid: item.uuid, text: item.first_name + ' ' + item.last_name+ ' | ' + item.mobile });
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

export function useDeleteTeacher() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return teachers.deleteTeacher(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('classes');
        queryClient.invalidateQueries('class');
        queryClient.invalidateQueries('classes-list');
        store.dispatch(setAlert(true, 'success', 'Class deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}