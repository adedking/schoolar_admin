import { store } from '..';
import { setAlert, setIsLoading } from '../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { classes } from '../../api/classes';

export function useGetClasses() {
  return useQuery(
    ['classes', {}],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getClasses();
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
export function useGetClass(id) {
  return useQuery(
    ['class', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getClass(id);
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


export function useAddClass() {
  return useMutation(
    (payload) => {
      return classes.addClass(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('classes');
        queryClient.invalidateQueries('class');
        store.dispatch(setAlert(true, 'Add Class Successful', 'success', 'You have successfully added the class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}
