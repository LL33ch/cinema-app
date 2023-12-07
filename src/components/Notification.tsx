"use client"
import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface NotificationComponentProps {
	type?: 'success' | 'info' | 'error';
	message: string;
}

const Notification: React.FC<NotificationComponentProps> = ({ type, message }) => {
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

	// Показываем уведомление при монтировании компонента
	useEffect(() => {
		showToast();
	}, []);

	return null; // Компонент не отображает ничего, просто отвечает за показ уведомления
};

export default Notification;