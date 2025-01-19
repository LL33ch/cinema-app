import { Client, Databases, Account } from "appwrite";
// Import type models for Appwrite
import { type Models } from 'appwrite';

const client: Client = new Client();

client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject('6607377b3492fc4fdfa7'); // Replace with your project ID

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);