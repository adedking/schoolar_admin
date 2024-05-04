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

export function useGetClassesList(limit, page, search) {
  return useQuery(
    ['classes-list', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getClasses({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        newData.push({ id: null, value: null, text: 'Select a class', rank: null });
        data?.forEach((item) => {
          newData.push({ id: item.id, value: item.id, text: item.name, rank: item.class_level});
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

export function useGetClassesRanked(limit, page, search) {
  return useQuery(
    ['classes-ranked', { limit, page, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getClasses({
        limit,
        page,
        search,
      });
    },
    {
      select: (data) => {
        let newData = [];
        data?.forEach((item) => {
          newData.push(item);
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

export function useAddClass() {
  return useMutation(
    (payload) => {
      return classes.addClass(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('classes');
        queryClient.invalidateQueries('class');
        queryClient.invalidateQueries('classes-list');
        store.dispatch(setAlert(true, 'Class added successful', 'success', 'You have successfully added the class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useAddSubClass() {
  return useMutation(
    (payload) => {
      return classes.addSubClass(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('classes');
        queryClient.invalidateQueries('class');
        queryClient.invalidateQueries('classes-list');
        store.dispatch(setAlert(true, 'Class added successful', 'success', 'You have successfully added the class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useUpdateSubClass() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return classes.updateSubClass(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('students');
        queryClient.invalidateQueries('student');
        queryClient.invalidateQueries('students-list');
        store.dispatch(setAlert(true, 'success', 'Student updated successfully'));
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetSubClasses() {
  return useQuery(
    ['sub-classes', {}],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getSubClasses();
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
        data?.forEach((item) => {
          newData.push({ value: item.id, text: item.class_name + ' - ' + item.name, id: item.id, main_class_id: item.main_class_id  });
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

export function useAssignTeacherToClass() {
  return useMutation(
    (payload) => {
      return classes.assignTeacherToClass(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('classes');
        queryClient.invalidateQueries('class');
        store.dispatch(setAlert(true, 'Teacher assigned successful', 'success', 'You have successfully assigned teacher to class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetSubjectsBySubClass( id, limit, page, statusFilter, search ) {
  return useQuery(
    ['subjects-by-sub-class', { id, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getSubjectsBySubClasses({ id, limit, page, statusFilter, search });
    },
    {
      select: (data) => {
        data?.data?.forEach((subject) => {
          subject.subject_type = subject.compulsory === 1 ? 'Compulsory' : 'Optional'
        });
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetAttendanceBySubClass( id, limit, page, statusFilter, search ) {
  return useQuery(
    ['attendance-by-sub-class', { id, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getAtteandanceBySubClass({ id, limit, page, statusFilter, search });
    },
    {
      select: (data) => {
        data?.data?.forEach((subject) => {
          subject.subject_type = subject.compulsory === 1 ? 'Compulsory' : 'Optional'
        });
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useGetstudentsBySubClass( id, limit, page, statusFilter, search ) {
  return useQuery(
    ['students-by-sub-class', { id, limit, page, statusFilter, search }],
    () => {
      store.dispatch(setIsLoading(true));
      return classes.getStudentsBySubClasses({ id, limit, page, statusFilter, search });
    },
    {
      select: (data) => {
        data?.data?.forEach((subject) => {
          subject.subject_type = subject.compulsory === 1 ? 'Compulsory' : 'Optional'
        });
        return data;
      },
      onSettled: (data, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useDeleteSubClass() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return classes.deleteSubClass(payload);
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

export function useRemoveTeacherFromClass() {
  return useMutation(
    (payload) => {
      store.dispatch(setIsLoading(true));
      return classes.removeTeacherFromClass(payload);
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

export function useMarkClassAttendance() {
  return useMutation(
    (payload) => {
      return classes.markClassAttendance(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        queryClient.invalidateQueries('classes');
        queryClient.invalidateQueries('class');
        queryClient.invalidateQueries('classes-list');
        store.dispatch(setAlert(true, 'Class added successful', 'success', 'You have successfully added the class'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}






