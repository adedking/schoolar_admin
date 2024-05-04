import { store } from '../..';
import { setAlert, setIsLoading } from '../../components/components-slice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../..';
import { lessonPlans } from '../../../api/lesson-plan';

export function useGetLessonPlans( id, type, limit, page, statusFilter, search ) {
  return useQuery(
    ['lesson-plans', { id, type, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return lessonPlans.getLessonPlans({ id, type, limit, page, statusFilter, search });
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

export function useGetLessonPlan(id) {
  return useQuery(
    ['lesson-plan', {id}],
    () => {
      store.dispatch(setIsLoading(true));
      return lessonPlans.geLessonPlan(id);
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

export function useAddLessonPlan() {
  return useMutation(
    (payload) => {
      return lessonPlans.addLessonPlan(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('lesson-plans');
        queryClient.invalidateQueries('lesson-plan');
        store.dispatch(setAlert(true, 'Add Lesson Plan Successful', 'success', 'You have successfully created a lesson plan'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}
