"use client"
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import NotificationComponentProps from './Notification.props';

const Notification: React.FC<NotificationComponentProps> = ({ type, message }) => {
	const isMounted = useRef(false);

	const showToast = () => {
		switch (type) {
			case 'success':
				toast.success(message);
				break;
			case 'error':
				toast.error(message);
				break;
			default:
				toast(message);
				break;
		}
	};

	useEffect(() => {
		if (isMounted.current) {
			showToast();
		} else {
			isMounted.current = true;
		}
	}, []);

	return null;
};

export default Notification;
