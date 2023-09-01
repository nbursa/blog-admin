import React from 'react';
import { NotificationProps } from '../types';

const Notification: React.FC<NotificationProps> = ({
  message,
  status = 'failure',
}) => {
  return (
    <div
      className={`fixed bottom-0 right-0 mb-4 mr-4 ${
        status === 'success' ? 'bg-calm-secondary' : 'bg-calm-accent'
      } text-black p-4 rounded-xl font-poppins font-bold`}
    >
      {message}
    </div>
  );
};

export default Notification;
