import { store } from '../..';
import { setAlert, setIsLoading } from '../../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../..';
import { terms } from '../../../api/terms';

export function useGetTerms( limit, page, statusFilter, search ) {
  return useQuery(
    ['terms', { limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return terms.getTerms({ limit, page, statusFilter, search });
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


export function useGetTerm(id) {
  return useQuery(
    ['term', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return terms.getTerm(id);
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

export function useAddTerm() {
  return useMutation(
    (payload) => {
      return terms.addTerm(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('terms');
        queryClient.invalidateQueries('term');
        store.dispatch(setAlert(true, 'Add Term Successful', 'success', 'You have successfully created a term'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useUpdateTerm() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return terms.updateTerm(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('terms');
        queryClient.invalidateQueries('term');
        queryClient.invalidateQueries('terms-list');
        store.dispatch(setAlert(true, 'success', 'Term updated successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useDeleteTerm() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return terms.deleteTerm(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('terms');
        queryClient.invalidateQueries('term');
        queryClient.invalidateQueries('terms-list');
        store.dispatch(setAlert(true, 'success', 'Term deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetTermsList(limit, page, search) {
  return useQuery(
    ['terms-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return terms.getTerms({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        newData.push({ id: null, text: 'Select a session', value: null });
        data?.data.forEach((item) => {
          newData.push({ uuid: item.uuid, id: item.id, text: item.name + ' | (' + item.start_date + ' ' + item.end_date + ')' });
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