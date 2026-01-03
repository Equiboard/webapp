import { logger } from '@/utils/logger';
import type { Route } from '../+types/root';
import { authMiddleware } from '@/middleware/auth.server';
import { findOrgById } from '@/service/database/models/organization.model';
import { getInvitationsByOrg } from '@/service/database/models/invitation.model';
import type { IInvitation } from '@/types/invitation.types';

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

    return { memberInvited: orgInvites.map((invite: Partial<IInvitation>) => ({ email: invite.email, status: invite.status })) };
}
export default function onboarding({ loaderData }: Route.ComponentProps) {
    const memberInvited: [Partial<IInvitation>] = loaderData?.memberInvited;
    const cantAddCriteria = memberInvited.some((value) => value.status === 'pending');
    return (
        <div className="flex w-full flex-col">
            <div className="m-4 text-center">
                <h1>Onboarding Members</h1>
            </div>
            <div className="m-2 mx-8">
                {memberInvited && memberInvited.length > 0 ? (
                    <ul>
                        {memberInvited.map((member, index: number) => (
                            <li key={index} className="mt-2 mb-2 flex flex-row">
                                <div className="me-5">{member.email} </div>
                                <div>{member.status}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div> Spear Heading the Project ? </div>
                )}
                <button className="mt-2 rounded-2xl bg-blue-400 p-3 hover:bg-blue-200">Invite More Members</button>
                <button className="mt-2 rounded-2xl bg-green-400 p-3 hover:bg-green-200" disabled={cantAddCriteria}>
                    Add Criteria
                </button>
            </div>
        </div>
    );
}
