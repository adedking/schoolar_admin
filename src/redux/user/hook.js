import { user } from '../../api/user';
import { store } from '..';
import { clearToken, clearUser, setToken, setUser } from './user-slice';
import { Axios } from '../../api/axios'
import { queryClient } from '../..';
import { setAlert, setIsLoading } from '../components/components-slice';
import { useMutation } from '@tanstack/react-query';
import { setSchools } from '../school/reducer';

export function useLogin() {
  return useMutation(
    (payload) => {
      return user.login(payload);
    },
    {
      onSuccess: (response, variables, context) => {
        store.dispatch(setToken(response.data.authorization.token));
        store.dispatch(setSchools(response.data?.schools));
        store.dispatch(setUser(response.data));
        store.dispatch(setAlert(true, 'success', 'You have successfully logged in'));
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
          store.dispatch(setToken(response.data.authorization.token));
          store.dispatch(setUser(response.data));
          store.dispatch(setSchools(response.data.schools));
          store.dispatch(setAlert(true, 'success', 'You have successfully added your school'));
        },
        onSettled: (response, error, variables, context) => {
          store.dispatch(setIsLoading(false));
        },
      },
    );
  }

  export const logout = async () => {
    store.dispatch(clearUser());
    store.dispatch(clearToken());
    // store.dispatch(clearTwoFaToken());
    queryClient.invalidateQueries();
    delete Axios.defaults.headers.common['Authorization'];
    store.dispatch(setAlert(true, 'warning', 'You are successfully logged out.'));
  };