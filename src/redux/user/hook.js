import { user } from '../../api';
import { store } from '..';
import { clearToken, clearUser, setToken, setUser, setWebToken } from './user-slice';
import { Axios } from '../../api/axios';
import { queryClient } from '../..';
import { setAlert, setIsLoading } from '../components/components-slice';
import { setCompany } from '../company/reducer';
import { updateSectionData } from '../section/hook';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  return useMutation(
    (payload) => {
      return user.login(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        store.dispatch(setToken(response.data.authorization.token));
        store.dispatch(setCompany(response.data?.company));
        store.dispatch(setUser(response.data));
        store.dispatch(setAlert(true, 'success', 'You have successfully logged in'));
        updateSectionData(response.data.section);
      },
      onSettled: (response, error, variables, context) => {
        store.dispatch(setIsLoading(false));
      },
    },
  );
}

export function useSignUp() {
    return useMutation(
      (payload) => {
        return user.register(payload);
      },
      {
        onSuccess: (response, variables, context) => {
          // store.dispatch(setCompany(response.data?.company));
          updateSectionData(response.data.section);
          store.dispatch(setAlert(true, 'success', 'You have successfully signed up'));
          store.dispatch(setToken(response.data.authorization.token));
          store.dispatch(setUser(response.data));
          
        },
        onSettled: (response, error, variables, context) => {
          store.dispatch(setIsLoading(false));
        },
      },
    );
  }