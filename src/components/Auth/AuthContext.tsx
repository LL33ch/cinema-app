'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { toast } from 'sonner';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

interface AuthContextProps {
	isAuthenticated: boolean | null;
	isAccess: boolean | null;
	setIsAccess: (value: boolean) => void;
	setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
	isAuthenticated: null,
	isAccess: null,
	setIsAccess: () => { },
	setIsAuthenticated: () => { },
});

interface AuthProviderProps {
	children: ReactNode;
}

interface UserUpdateEvent {
	action: string;
	record: {
		id: string;
		collectionId: string;
		collectionName: string;
		username: string;
		verified: boolean;
		emailVisibility: boolean;
		email: string;
		created: string;
		updated: string;
		name: string;
		avatar: string;
		access: boolean;
	};
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [isAccess, setIsAccess] = useState<boolean | null>(null);
	const currentDate = new Date();
	const offset = 3;
	const localDate = new Date(currentDate.getTime() + offset * 3600 * 1000);
	const dateISOString = localDate.toISOString();

	function handleUserUpdate(e: UserUpdateEvent) {
		if (e.record && e.record.access) {
			setIsAccess(true);
		} else {
			setIsAccess(false);
		}
	}

	useEffect(() => {
		async function initializeAccess() {
			try {
				const currentUser = pb.authStore.model;
				if (currentUser) {
					const userRecord = await pb.collection('users').getOne(currentUser.id, { requestKey: null });
					await pb.collection('users').update(currentUser.id, {
						online: dateISOString,
					}, { requestKey: null });
					setIsAccess(userRecord.access);
				}
			} catch (error) {
				console.error('Ошибка при инициализации доступа пользователя:', error);
				setIsAccess(false);
			}
		}

		initializeAccess();

		const userId = pb.authStore.model?.id;
		if (userId && !isAccess) {
			pb.collection('users').subscribe(userId, handleUserUpdate);
			return () => { pb.collection('users').unsubscribe(userId); };
		}
	}, []);
	const value = { isAuthenticated, isAccess, setIsAccess, setIsAuthenticated };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
	return useContext(AuthContext);
}