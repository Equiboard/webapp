import type { UserSchema } from '@/service/database/schema/user.schema';
import type { InferSchemaType } from 'mongoose';

export type IUser = InferSchemaType<typeof UserSchema>;

export interface IRecentActivity {
    id: string;
    message: string;
    timestamp: string;
}
