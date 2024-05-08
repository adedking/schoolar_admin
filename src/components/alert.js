/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import NotificationSystem from 'react-notification-system';
import { store } from '../redux';
import { setAlert } from '../redux/components/components-slice';
// import { store } from '../redux';
// import { setAlert } from '../redux/components/components-slice';

var style = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      background: 'white'
    },
  }
}

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
    return () => {
      store.dispatch(
        setAlert({
          show: false,
          title: '',
          type: '',
          message: '',
          close: true,
        }),
      );
    }
  },[message, type])
  return (
    <NotificationSystem ref={notificationSystem} style={style} />
  )
}

export default Alert;
