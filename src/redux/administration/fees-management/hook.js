import { store } from '../..';
import { setAlert, setIsLoading } from '../../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../..';
import { feeManagement } from '../../../api/fees-management';

export function useGetFees( limit, page, statusFilter, search ) {
  return useQuery(
    ['sessions', { limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return feeManagement.getFees({ limit, page, statusFilter, search });
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


export function useGetFee(id) {
  return useQuery(
    ['session', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return feeManagement.getFee(id);
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

export function useAddFee() {
  return useMutation(
    (payload) => {
      return feeManagement.addFee(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('sessions');
        queryClient.invalidateQueries('session');
        store.dispatch(setAlert(true, 'Add Parent Successful', 'success', 'You have successfully created a session'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useUpdateFee() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return feeManagement.updateFee(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('sessions');
        queryClient.invalidateQueries('session');
        queryClient.invalidateQueries('sessions-list');
        store.dispatch(setAlert(true, 'success', 'Session updated successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useDeleteFee() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return feeManagement.deleteFee(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('sessions');
        queryClient.invalidateQueries('session');
        queryClient.invalidateQueries('sessions-list');
        store.dispatch(setAlert(true, 'success', 'Session deleted successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetFeesList(limit, page, search) {
  return useQuery(
    ['sessions-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return feeManagement.getFees({
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