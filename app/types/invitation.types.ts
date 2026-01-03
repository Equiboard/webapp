import type { InvitationSchema } from '@/service/database/schema';
import type { InferSchemaType } from 'mongoose';

export type IInvitation = InferSchemaType<typeof InvitationSchema>;
