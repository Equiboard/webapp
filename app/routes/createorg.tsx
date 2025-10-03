import { Form } from 'react-router';
import Header from '@/components/header';
import { mapTextColor } from '@/utils/colors';

export default function createOrg() {
    return (
        <div className={`bg-primary ${mapTextColor('primary')} flex min-h-screen flex-col font-sans`}>
            <Header />

            <div className="container-padding-x flex flex-1 flex-col items-center justify-center gap-y-8">
                <Form method="post" className="bg-secondary flex w-full flex-col justify-center gap-y-2 rounded-xl p-4 md:max-w-3/4 md:gap-y-6 md:px-6 md:py-6">
                    <h1 className="text-2xl">Create New Organisation</h1>
                    <div className="flex flex-col gap-y-4 py-2 text-lg md:gap-y-8">
                        <div className="flex flex-col justify-between gap-y-2 px-2 sm:px-4 md:flex-row md:gap-y-0">
                            <label className="flex-1" htmlFor="OrgName">
                                Organization Name
                            </label>
                            <input name="OrgName" type="text" className="w-full flex-1 rounded-xl border-2 border-black px-2" />
                        </div>

                        <div className="flex flex-col justify-between gap-y-2 px-2 sm:px-4 md:flex-row md:gap-y-0">
                            <label className="flex-1" htmlFor="OrgDescription">
                                Organization Description
                            </label>
                            <textarea name="OrgDescription" className="w-full flex-1 rounded-xl border-2 border-black px-2" />
                        </div>

                        <div className="flex flex-col justify-between gap-y-2 px-2 sm:px-4 md:flex-row md:gap-y-0">
                            <label className="flex-1" htmlFor="UserRole">
                                Your Role
                            </label>
                            <input name="UserRole" type="text" className="w-full flex-1 rounded-xl border-2 border-black px-2" />
                        </div>

                        <div className="flex flex-col justify-between gap-y-2 px-2 sm:px-4 md:flex-row md:gap-y-0">
                            <label className="flex-1" htmlFor="OrgMembers">
                                Initial Members
                            </label>
                            <div className="flex flex-1 gap-x-1">
                                <input name="OrgMembers" type="text" className="w-full flex-1 rounded-xl border-2 border-black px-2" />
                                <button className="w-3/4 flex-0 rounded-2xl border-2 border-black p-2 leading-0">+</button>
                            </div>
                        </div>

                        <div className="flex flex-row flex-wrap items-center justify-between gap-y-2 px-2 pt-2 sm:px-4 md:gap-y-0">
                            <button className="rounded-2xl border-2 border-black px-2">Cancel</button>
                            <button className="rounded-2xl border-2 border-black px-2">Create Organization</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
