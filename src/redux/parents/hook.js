import { store } from '..';
import { setAlert, setIsLoading } from '../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../..';
import { parents } from '../../api/parents';

export function useGetParents( limit, page, statusFilter, search ) {
  return useQuery(
    ['parents', { limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return parents.getParents({ limit, page, statusFilter, search });
    },
    {
      select: (data) => {
        
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}


export function useGetParent(id) {
  return useQuery(
    ['parent', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return parents.getParent(id);
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

export function useAddParent() {
  return useMutation(
    (payload) => {
      return parents.addStudent(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('parents');
        store.dispatch(setAlert(true, 'Add Parent Successful', 'success', 'You have successfully added a parent'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetParentsList(limit, page, search) {
  return useQuery(
    ['parents-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return parents.getParents({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        newData.push({ id: null, text: 'Select a parent', value: null });
        data?.data.forEach((item) => {
          newData.push({ uuid: item.uuid, id: item.id, text: item.title + '. ' + item.first_name + ' ' + item.last_name+ ' | ' + item.mobile });
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

export function useGetstudentsByParent( id, limit, page, statusFilter, search ) {
  return useQuery(
    ['students-by-parent', { id, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return parents.getStudentsByParent({ id, limit, page, statusFilter, search });
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

export function useDeleteParent() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return parents.deleteSubClass(payload);
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