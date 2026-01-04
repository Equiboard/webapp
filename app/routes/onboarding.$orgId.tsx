import { logger } from '@/utils/logger';
import type { Route } from '../+types/root';
import { authMiddleware } from '@/middleware/auth.server';
import { findOrgById } from '@/service/database/models/organization.model';
import { getInvitationsByOrg } from '@/service/database/models/invitation.model';
import type { IInvitation } from '@/types/invitation.types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ListPlus, RefreshCcw, Trash2, UserPlus } from 'lucide-react';

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ params }: Route.LoaderArgs) {
    logger.debug(params, 'Params in onboarding');
    if (!params.orgId) {
        return null;
    }
    const orgInfo = await findOrgById(params?.orgId);
    logger.trace(orgInfo, 'Organization info for onboarding');
    if (!orgInfo) {
        return { error: 'Org doesnt exist' };
    }
    const orgInvites = await getInvitationsByOrg(orgInfo._id);

    return { orgName: orgInfo.name, memberInvited: orgInvites.map((invite: Partial<IInvitation>) => ({ email: invite.email, status: invite.status })) };
}
export default function onboarding({ loaderData }: Route.ComponentProps) {
    const memberInvited: [Partial<IInvitation>] = loaderData?.memberInvited;
    const orgName: string = loaderData?.orgName;
    const cantAddCriteria = memberInvited.some((value) => value.status === 'pending');
    return (
        <div className="mx-4 flex flex-col items-center">
            <div className="m-4">
                <h1 className="text-center">
                    <p className="text-blue-400">{orgName}</p>
                    <p>Onboarding</p>
                </h1>
            </div>

            <Table className="m-auto max-w-1/2 rounded-md border-b bg-white">
                <TableCaption>{orgName} Members</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-18">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {memberInvited && memberInvited.length > 0 ? (
                        memberInvited.map((member, index: number) => (
                            <TableRow className="border-b" key={index}>
                                <TableCell>{member.email} </TableCell>
                                <TableCell>{member.status}</TableCell>
                                <TableCell>
                                    <div className="flex gap-x-2">
                                        <RefreshCcw className="hover:text-blue-500" />
                                        <Trash2 className="hover:text-red-500" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={2}> Spear Heading the Project ? </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex w-full flex-col justify-evenly md:flex-row">
                <button className="mt-2 flex justify-center gap-2 rounded-2xl bg-blue-400 p-3 hover:bg-blue-200">
                    <UserPlus />
                    Add Member
                </button>
                <button className="mt-2 flex justify-center gap-2 rounded-2xl bg-green-400 p-3 hover:bg-green-200" disabled={cantAddCriteria}>
                    <ListPlus />
                    Add Criteria
                </button>
            </div>
        </div>
    );
}
