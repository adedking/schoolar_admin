// import { user } from '../../api/user';
// import { store } from '..';
// import { clearToken, clearUser, setToken, setUser } from './user-slice';
// import { Axios } from '../../api/axios'
// import { queryClient } from '../..';
// import { setAlert, setIsLoading } from '../components/components-slice';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { clearSchools, setSchools } from '../school/reducer';

// export function useGetTeachers( limit, page, statusFilter, search ) {
//   return useQuery(
//     ['teachers', { limit, page, statusFilter, search }],
//     () => {
//       store.dispatch(setIsLoading(true));
//       return airtimeInformation.getAirtimes({ limit, page, statusFilter, search });
//     },
//     {
//       select: (data) => {
//         data?.data?.forEach((airtime) => {
//           airtime.created = moment(airtime.created).format('MMMM DD, YYYY');
//           airtime.status = airtime.status?parseFloat(airtime.status): 0;
//           switch (airtime.status) {
//             case 0:
//               airtime.computedActions = [0];
//               break;
//             case 1:
//               airtime.computedActions = [1];
//               break;
//             case 2:
//               airtime.computedActions = [2,3];
//               break;
//             // case 3:
//             //   airtime.computedActions = [1];
//             //   break;
//             default:
//               break;
//           }
//         });

//         return data;
//       },
//       onSettled: (data, error, variables, context) => {
//         store.dispatch(setIsLoading(false));
//       },
//       // keepPreviousData: true
//     },
//   );
// }

// export const updateUser = ({ reload = false, route = '' }) => {
//   user.profile().then((response) => {
//     let user = JSON.parse(JSON.stringify(response.data));
//     store.dispatch(setUser(user));
//     store.dispatch(setSchools(user.schools));
//     setTimeout(() => {
//       if (reload) {
//         window.location.reload(true);
//       }
//       if (route) {
//         window.location.replace(route);
//       }
//     }, 2000);
//   });
// };

// export function useSignUp() {
//   return useMutation(
//     (payload) => {
//       return user.register(payload);
//     },
//     {
//       onSuccess: (response, variables, context) => {
//         store.dispatch(setToken(response.data.authorization.token));
//         store.dispatch(setUser(response.data));
//         store.dispatch(setSchools(response.data.schools));
//         store.dispatch(setAlert(true, 'Signup successful', 'success', 'You have successfully added your school'));
//       },
//       onSettled: (response, error, variables, context) => {
//         store.dispatch(setIsLoading(false));
//       },
//     },
//   );
// }

// export function UseVerifyOTP() {
//   return useMutation(
//     (payload) => {
//       return user.verify_otp(payload);
//     },
//     {
//       onSuccess: (response, variables, context) => {
//         updateUser({reload: false})
//         store.dispatch(setAlert(true, 'OTP verification successful', 'success', 'You have successfully verified your email. Welcome to Schoolar'));
//       },
//       onSettled: (response, error, variables, context) => {
//         store.dispatch(setIsLoading(false));
//       },
//     },
//   );
// }

// export const logout = async () => {
//   store.dispatch(clearUser());
//   store.dispatch(clearSchools());
//   store.dispatch(clearToken());
//   // store.dispatch(clearTwoFaToken());
//   queryClient.invalidateQueries();
//   delete Axios.defaults.headers.common['Authorization'];
//   store.dispatch(setAlert(true, 'Logout successful', 'warning', 'You are successfully logged out.'));
// };