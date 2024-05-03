import { companies } from '../../api';
import { store } from '..';
import { setAlert, setIsLoading } from '../components/components-slice';
import { updateUser } from '../user/hook';
import { useMutation } from '@tanstack/react-query';
import { setSchools } from './school-slice';

export function useCreateSchools() {
  return useMutation(
    (payload) => {
      return companies.create(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        store.dispatch(setAlert(true, 'success', 'School(s) created successfully.'));
        updateUser({ reload: false });
      },
    },
  );
}

export function useUpdateSchool() {
  return useMutation(
    (payload) => {
      return companies.update(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        updateCurrentSchool();
        updateUser({ reload: false });
        store.dispatch(setAlert(true, 'success', 'School information updated successfully.'));
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}


export function updateCurrentSchool() {
  let currentCompanyId = store.getState().companySlice.company.id;

  companies.getCompany(currentCompanyId).then((response) => {
    store.dispatch(setSchools(response.data));
  });
}
