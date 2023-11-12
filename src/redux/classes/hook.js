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
        store.dispatch(setAlert(true, 'Class added successful', 'success', 'You have successfully added the class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetSubClassesList(limit, page, search) {
  return useQuery(
    ['subclasses-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getSubClasses({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        newData.push({ value: null, label: 'Select a class' });
        data?.forEach((item) => {
          newData.push({ value: item.id, label: item.class_name + ' - ' + item.name });
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

export function useGetSubClass(id) {
  return useQuery(
    ['sub-class', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getSubClass(id);
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
