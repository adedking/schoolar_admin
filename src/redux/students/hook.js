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
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
      // keepPreviousData: true
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
        queryClient.invalidateQueries('teachers');
        store.dispatch(setAlert(true, 'Add Teacher Successful', 'success', 'You have successfully added teacher'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}