import { store } from '..';
import { setIsLoading } from '../components/components-slice';
import { useQuery } from '@tanstack/react-query';
import { attendances } from '../../api/attendances';

export function useGetAttendances( type, limit, page, statusFilter, search ) {
  return useQuery(
    ['class-attendances', { type, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return attendances.getAttendances({ type, limit, page, statusFilter, search });
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

export function useGetAttendancesBySubject( type, limit, page, statusFilter, search ) {
  return useQuery(
    ['subject-attendances', { type, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return attendances.getAttendancesBySubject({ type, limit, page, statusFilter, search });
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

export function useGetAttendance( uuid, type ) {
  return useQuery(
    ['attendance', { uuid, type }],
    () => {
      store.dispatch(setIsLoading(true));
      return attendances.getAttendance({ uuid, type });
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