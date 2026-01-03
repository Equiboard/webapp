import { useActionData, useSubmit } from 'react-router';
import Header from '@/components/header';
import { mapTextColor } from '@/utils/colors';
import type { Route } from '../+types/root';
import { connectToDatabase } from '@/service/database/index.server';
import { useRef, useState } from 'react';
import { createOrganization } from '@/service/database/models/organization.model';
import { authMiddleware } from '@/middleware/auth.server';
import { userContext } from '@/context/user.context';
import { addOrgToUser } from '@/service/database/models/user.model';
import { logger } from '@/utils/logger';

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function action({ request, context }: Route.ActionArgs) {
    // Here you can handle the form submission, e.g., save the organization details to the database
    await connectToDatabase();
    const userInfo = context.get(userContext);
    if (!userInfo || !userInfo?._id) {
        return { error: 'Not logged in' };
    }
    const formData = await request.formData();
    const title = formData.get('ProjectTitle')?.toString();
    const summary = formData.get('ProjectSummary')?.toString();
    const members = formData.getAll('tmList');
    logger.debug(title, summary, members);
    if (!title || !summary || !members) {
        return { error: 'Invalid form' };
    }
    const orgInfo = await createOrganization({
        name: title,
        summary,
        onboardingPhaseClosed: false,
        creatorId: userInfo._id,
        members: members.map((member) => ({
            email: member.toString(),
            role: 'member',
            joinedAt: new Date(),
            equityPercentage: 0,
        })),
    });
    if (!orgInfo) {
        return { error: 'Failed to Create Org' };
    }

    await addOrgToUser(userInfo._id, orgInfo._id);

    return { success: true };
}
export function loader() {
    return null;
}
export default function createOrg() {
    const [members, setMembers] = useState<string[]>([]);
    const memberInput = useRef<HTMLInputElement>(null);
    const submit = useSubmit();
    const realFormref = useRef<HTMLFormElement>(null);
    const data = useActionData();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!realFormref.current) {
            return;
        }
        const totalForm = new FormData(realFormref.current);
        for (const member of members) {
            totalForm.append('tmList', member.toString());
        }
        logger.debug('Submitting ');
        submit(totalForm, { method: 'post', action: '.' });
    };
    const addMember = () => {
        if (memberInput.current) {
            const value = memberInput.current.value.trim();
            if (value === '') {
                return;
            }
            if (members.includes(value)) {
                alert('Email already added');
                return;
            }
            if (/^.*@.*\..*$/.test(value)) {
                setMembers((prev) => {
                    if (prev) {
                        return [...prev, value];
                    }
                    return prev;
                });
                memberInput.current.value = '';
            } else {
                // Should show error
                logger.error('Pattern for email does not match');
            }
        }
    };
    return (
        <div className={`bg-primary ${mapTextColor('primary')} flex min-h-screen flex-col font-sans`}>
            <Header />
            {data?.success ? (
                <div className="container-padding-x flex flex-1 flex-col items-center justify-center gap-y-8 text-emerald-700">Org Created successfully</div>
            ) : (
                <div className="container-padding-x flex flex-1 flex-col items-center justify-center gap-y-8">
                    <form ref={realFormref} onSubmit={handleSubmit} className="bg-secondary flex w-full flex-col justify-center gap-y-2 rounded-xl p-4 md:max-w-3/4 md:gap-y-6 md:px-6 md:py-6">
                        <h1 className="text-2xl">Create New Organisation</h1>
                        <div className="flex flex-col gap-y-4 py-2 text-lg md:gap-y-8">
                            {/* Project Title */}
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                                <label htmlFor="ProjectTitle" className="w-full font-medium text-gray-700 md:w-1/3">
                                    Project Title
                                </label>
                                <input
                                    id="ProjectTitle"
                                    name="ProjectTitle"
                                    type="text"
                                    placeholder="Enter project title"
                                    className="w-full rounded-xl border-2 border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-2/3"
                                />
                            </div>

                            {/* Project Summary */}
                            <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4">
                                <label htmlFor="ProjectSummary" className="w-full font-medium text-gray-700 md:w-1/3">
                                    Project Summary
                                </label>
                                <textarea
                                    id="ProjectSummary"
                                    name="ProjectSummary"
                                    placeholder="Enter project summary"
                                    className="h-24 w-full resize-none rounded-xl border-2 border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-2/3"
                                />
                            </div>

                            {/* Team Members */}
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                                <label htmlFor="TeamMembers" className="w-full font-medium text-gray-700 md:w-1/3">
                                    Team Members
                                </label>
                                <div className="flex w-full gap-2 md:w-2/3">
                                    <input
                                        id="TeamMembers"
                                        name="TeamMembers"
                                        ref={memberInput}
                                        type="email"
                                        placeholder="Add member emails"
                                        className="flex-1 rounded-xl border-2 border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    />
                                    <button onClick={addMember} type="button" className="w-12 rounded-xl border-2 border-gray-300 text-gray-700 transition hover:bg-blue-500 hover:text-white">
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                                <div className="w-full font-medium text-gray-700 md:w-1/3"></div>
                                <div className="flex flex-col gap-2">
                                    {members.map((s) => (
                                        <p key={s}>{s}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-4 flex justify-end gap-4">
                                <button
                                    onClick={() => {
                                        setMembers([]);
                                    }}
                                    type="reset"
                                    className="rounded-xl border-2 bg-yellow-500 px-4 py-2 text-gray-700 transition hover:bg-white hover:text-black"
                                >
                                    Reset
                                </button>
                                <button type="submit" className="rounded-xl bg-blue-500 px-4 py-2 text-white transition hover:bg-green-600">
                                    Register Project
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
