/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import NotificationSystem from 'react-notification-system';
// import { store } from '../redux';
// import { setAlert } from '../redux/components/components-slice';

const Alert = ({
  title=null,
  message=null,
  type=null,
}) => {
  const notificationSystem = React.createRef();

  useEffect(() => {
    const notification = notificationSystem.current;
    if (message && type) {
      notification.addNotification({
        title: title,
        message: message,
        level: type
      });
    }
    // return () => {
    //   notification.removeNotification();
    //   store.dispatch(
    //     setAlert(
    //       false,
    //       '',
    //       '',
    //       '',
    //     ),
    //   );
    // }
  },[message, type])
  return (
    <NotificationSystem ref={notificationSystem} />
  )
}

export default Alert;
