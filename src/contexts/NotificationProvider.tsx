import React, { createContext, ReactNode, useContext, useState } from 'react';
import Notification from '../components/Notification.tsx';
import { NotificationContextType, NotificationState } from '../types';
import { initialNotificationState } from '../constants';

const NotificationContext = createContext<NotificationContextType>(() => {});

interface NotificationProviderProps {
  children: ReactNode;
}

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<NotificationState>(
    initialNotificationState
  );

  const triggerNotification = (
    newStatus: 'success' | 'failure' | 'idle',
    newMessage: string,
    newDuration?: number
  ) => {
    const duration = newDuration || state.duration;

    setState(prevState => ({
      ...prevState,
      show: true,
      status: newStatus,
      message: newMessage,
      duration: duration,
    }));

    setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        show: false,
        status: 'idle',
        message: '',
      }));
    }, duration);
  };

  return (
    <NotificationContext.Provider value={triggerNotification}>
      {children}
      {state.show && (
        <Notification status={state.status} message={state.message} />
      )}
    </NotificationContext.Provider>
  );
};
