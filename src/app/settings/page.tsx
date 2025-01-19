import { SettingsForm } from '@/components/Auth/SettingsForm';
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Настройки пользователя ◦ Cinema App',
	description: 'Настройки аккаунта пользователя',
}

export default function AuthPage() {
	return <SettingsForm />;
}