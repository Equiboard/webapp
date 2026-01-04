import type { UserSchema } from '@/service/database/schema/user.schema';
import type { InferSchemaType } from 'mongoose';

export type IUser = InferSchemaType<typeof UserSchema> & { _id: string };

export type SerializedUser = {
    _id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    passwordHash?: string | null;
};
