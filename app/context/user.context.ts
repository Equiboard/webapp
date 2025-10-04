import type { IUser } from '@/types';
import { createContext } from 'react-router';

export const userContext = createContext<IUser | null>(null);
