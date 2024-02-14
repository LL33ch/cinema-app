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

// Значение по умолчанию контекста должно соответствовать интерфейсу AuthContextProps
const AuthContext = createContext<AuthContextProps>({
	isAuthenticated: null,
	isAccess: false,
	setIsAccess: () => { }, // пустая функция
	setIsAuthenticated: () => { }, // пустая функция
});

// Используйте <> для указания типа React дочерних компонентов
interface AuthProviderProps {
	children: ReactNode;
}

// Явно укажите, что AuthProvider является функциональным компонентом с определёнными props
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	// Инициализируйте состояние со значением, соответствующим типу boolean
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const [isAccess, setIsAccess] = useState<boolean | null>(null);

	async function fetchUserAuthInfo() {
		if (pb.authStore && pb.authStore.model) {
			try {
				const userAuthInfo = await pb.collection('users').getOne(pb.authStore.model.id, { requestKey: null });
				if (userAuthInfo.access) {
					setIsAccess(true);
				}
			} catch (error) {
				toast.error("An error occurred while fetching the user auth info:" + error);
			}
		}
	}

	useEffect(() => {
		fetchUserAuthInfo();
	}, [])

	const value = { isAuthenticated, isAccess, setIsAccess, setIsAuthenticated };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Экспортируйте хук для использования контекста
export function useAuth() {
	return useContext(AuthContext);
}